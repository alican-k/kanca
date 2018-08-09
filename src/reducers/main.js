import { 
	__, compose as c, all, always, assoc, assocPath, concat, defaultTo, descend, dissoc, evolve,
	 flatten, filter as filtr, findIndex, identity, is, isNil, ifElse, intersperse, lt, map, prepend, prop, propEq, remove, reduce,
	 slice, take, trim, toLower, startsWith
} from 'ramda'
import { move } from 'ramda-adjunct'
import * as actionTypes from '../actions/types'
import { listsConst, statusConstSimple, statusConstWithNone, saveTypeConst, filterConst, 
	moreStatusConst, RECORD_LIMIT  } from '../constants'
import { splitItem, splitMeaning } from '../helpers/utils'
import { get, set, helpers } from '../helpers/state'

const initial = {
	me				: null,
	
	records 		: [],
	recordsStatus	: statusConstSimple.LOADING,
	moreStatus		: moreStatusConst.NONE,
	index			: null,
	step			: 0,

	responses		: {},
	term			: null,

	currentTime		: null,

	save			: {
		type 	: saveTypeConst.NONE,
		data	: null
	},

	filter			: {
		active		: false,
		choise 		: filterConst.ALL
	}
}

const reducer = (state = initial, action) => {

	switch (action.type) {

		case actionTypes.USER_DATA_LOADED: {
			const { name } = action.payload
			return {...state, me: { name }}
		}

		case actionTypes.RECORDS_LOAD: {
			const { more } = action.payload
			if(!more) {
				const { me, responses, filter } = state
				return {...initial, me, responses, filter}
			}
			return {...state, moreStatus: moreStatusConst.LOADING}
		}

		case actionTypes.RECORDS_LOADED: {
			// data içerisinde count verisi de var.
			const records = state.moreStatus === moreStatusConst.LOADING
				? defaultTo([], [...state.records, ...action.payload.data])
				: defaultTo([], action.payload.data)
			return {
				...state,
				records 		: helpers.sortBySearchDate(records),
				recordsStatus	: statusConstSimple.LOADED,
				moreStatus		: action.payload.data.length < RECORD_LIMIT ? moreStatusConst.NOT_NEED : moreStatusConst.NEED
			}
		}

		case actionTypes.SET_CURRENT_TIME: {
			const { currentTime } = action.payload
			return {...state, currentTime}
		}

		case actionTypes.SEARCH: {
			const { time } = action.payload
			const term = prepareTerm(action)
			const response = defaultTo(initialResponse, get.responseOf(term)(state))
			const index = get.indexByTerm(term)(state)
			const memorizedFlag = get.memorizeDateOfIndex(index)(state) > 0 ? 'b' : 'a'
			const order = memorizedFlag + time

			return evolve(__, state)({
				term		: always(term),
				index		: () => index < 0 ? null : 0,
				responses	: assoc(term, response),
				records		: ifElse(
					() => index < 0,
					identity,
					c(
						assocPath([0, 'order'], order),
						assocPath([0, 'searchDate'], time), 
						move(index, 0)
					)
				),
				save 		: () => index < 0 
								? {type: saveTypeConst.NONE, data: null}
								: {type: saveTypeConst.SEARCH_DATE, data: {term, time, order }}
			})
		}

		case actionTypes.SEARCH_FETCHED: {
			const {meaning, time} = action.payload
			const term = prepareTerm(action)
			const response = fetchedResponse(meaning)
			const index = get.indexByTerm(term)(state)

			const newR = helpers.meaningFound(meaning) && index < 0 
				? newRecord(term, time, meaning) 
				: null

			return evolve(__, state)({
				responses	: assoc(term, response),
				records		: ifElse(
					() => Boolean(newR),
					prepend(newR),
					identity
				),
				index		: helpers.meaningFound(meaning) ? always(0) : identity,
				save		: () => Boolean(newR)
								? {type: saveTypeConst.NEW_RECORD, data: dissoc('meaning', newR)}
								: {type: saveTypeConst.NONE, data: null}
			})
		}

		case actionTypes.DISPLAY: {
			const { term } = action.payload
			const index = get.indexByTerm(term)(state)
			const response = defaultTo(initialResponse, get.responseOf(term)(state))
			
			return evolve(__, state)({
				index		: always(index),
				term		: always(term),
				responses	: assoc(term, response)
			})
		}
		case actionTypes.DISPLAY_FETCHED: {
			const {term, meaning, time} = action.payload
			const response = fetchedResponse(meaning)
			return evolve(__, state)({
				responses: assoc(term, response)
			})
		}

		case actionTypes.RECORD_UNMOUNT: {
			if(state.filter.choise === filterConst.ALL)
				return {...state, index: null, step: 0}

			const predicate = state.filter.choise === filterConst.MEMORIZED
				? record => record.memorizeDate > 0
				: record => record.memorizeDate === 0

			const records = filtr(predicate)(state.records)

			return {...state, records, index: null, step: 0}
		}

		case actionTypes.SET_STEP: {
			const { step } = action.payload
			return {...state, step}
		}

		case actionTypes.SET_ANSWER: {
			const { answer } = action.payload
			return set.setAnswer(answer)(state)
		}

		case actionTypes.LOG_OUT: {
			return {...state, me: null}
		}

		case actionTypes.EDIT_UNMOUNT: {
			const { time } = action.payload
			const term = get.term(state)
			const answers = get.answers(state)
			const searchDate = get.searchDate(state)
			console.log('searchDate: ', searchDate)
			const memorizeDate = helpers.completed(answers) ? time : 0
			const order = (memorizeDate > 0 ? 'b' : 'a') + searchDate
			const stateOrderUpdated = set.order(order)(state)
			const stateMemorizeDateUpdated = set.memorizeDate(memorizeDate)(stateOrderUpdated)

			return {
				...stateMemorizeDateUpdated,
				save: {
					type: saveTypeConst.ANSWERS,
					data: {term, answers, memorizeDate, order}
				}
			}
		}

		case actionTypes.TOGGLE_MODAL: {
			const { active } = action.payload
			const filter = {...state.filter, active}
			return { ...state, filter }
		}

		case actionTypes.SET_FILTER: {
			const { choise } = action.payload
			const filter = {...state.filter, choise}
			return {...state, filter}
		}

		default:
			return state
	}
}

const initialResponse = { status: statusConstSimple.LOADING }
const fetchedResponse = meaning => ({ status: statusConstSimple.LOADED, meaning })

const prepareTerm = action => c(toLower, trim)(action.payload.term)

export const newRecord = (term, time, meaning) => ({
	term,
	searchDate		: time,
	order			: 'a' + time,
	memorizeDate	: 0,
	summary			: createSummary(meaning),
	answers			: []
})

const createSummary = meaning => {
	const str = meaning.entr.length > meaning.tren.length ? meaning.entr : meaning.tren
 	return c(
		take(70),
		reduce(concat, ''),
		intersperse(', '),
		map(item => slice(3, item.length, item)),
		filtr(startsWith('def')),
		flatten,
		map(splitItem),
		take(5),
		splitMeaning,
	)(str)
}
export default reducer
