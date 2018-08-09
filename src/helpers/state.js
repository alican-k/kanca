import { 
	__, all, always, anyPass, assocPath, both, compose as c, concat, converge, descend, 
	equals, either, identity, is, isEmpty, isNil, findIndex, gt,
	keys, last, map, not, objOf, path, pathEq, pick, prop, propEq, sortWith, toLower, unapply , useWith
} from 'ramda'
import { lengthGte, lengthEq, isNilOrEmpty } from 'ramda-adjunct'
import { authStatusConst, MIN_ANSWER_LENGTH, statusConstSimple, questions } from '../constants'

/*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  */

const log = title => x => { console.log(title, ' :', x); return x }

/* 
 *  
*/
const composeBy		= r => (param, f) => c(r(param), f)
const propBy		= composeBy(prop)
const equalsBy		= composeBy(equals)
const objOfBy		= composeBy(objOf)
const isBy			= composeBy(is)

const paramsToArray = unapply(identity)
const defaultToFunction = i => is(Number, i) || is(String, i) ? always(i) : i

const flexPicker = arr => converge(paramsToArray, map(defaultToFunction, arr))
const flexPath = arr => converge(path, [flexPicker(arr), identity])
const flexAssoc = arr => val => converge(assocPath(__, val), [flexPicker(arr), identity])

/*  *  *  *  *  *  *  *  *  *  *  G E T T E R  *  *  *  *  *  *  *  *  *  *  */

const mainObj				= pick(['main'])

const me					= prop('me')

const records				= prop('records')
const recordsObj 			= objOfBy('records', records)
const recordsStatus			= prop('recordsStatus')
const recordsLoading		= equalsBy(statusConstSimple.LOADING, recordsStatus)
const moreStatusObj			= objOfBy('moreStatus', prop('moreStatus'))
const index 				= prop('index')
const step					= prop('step')
const stepObj				= objOfBy('step', step)
const record 				= flexPath([records, index])
const save					= prop('save')
const searchDate			= flexPath(['records', index, 'searchDate'])

const indexByTerm 			= term => c(findIndex(propEq('term', term)), records)
const memorizeDateOfIndex	= i => path(['records', i, 'memorizeDate'])

const term 					= prop('term')
const termObj				= objOfBy('term', term)
const responses 			= prop('responses')
const responseOf			= term => c(prop(term), responses)
const response 				= flexPath(['responses', term])
const responseObj			= objOfBy('response', response)
const responseLoading		= c(propEq('status', statusConstSimple.LOADING), response)
const meaning				= propBy('meaning', response)
const meaningNotFound		= isBy(String, meaning)
const meaningDidYouMean		= isBy(Array, meaning)
const meaningNotValid		= c(anyPass([isNil, is(String), is(Array)]), meaning)

const answersPath			= ['records', index, 'answers']
const answers 				= flexPath(answersPath)
const answer 				= flexPath([answers, step])

const filter				= prop('filter')
const filterObj				= objOfBy('filter', filter)
const choise				= path(['filter', 'choise'])

const lastSearchDate 		= c(prop('searchDate'), last, log('recs: '), records)

/*  *  *  *  *  *  *  *  *  *  *  S E T T E R  *  *  *  *  *  *  *  *  *  *  *  */

const setAnswer 			= flexAssoc([...answersPath, step])
const memorizeDate			= flexAssoc(['records', index, 'memorizeDate'])
const order					= flexAssoc(['records', index, 'order'])

/*  *  *  *  *  *  *  *  *  *  *  N O N - S T A T E  *  *  *  *  *  *  *  *  *  */

// PARAM: records
const sortBySearchDate 		= sortWith([descend(prop('searchDate'))])

// PARAM: meaning
const meaningFound 			= c(not, either(is(String), is(Array)))

// PARAM: answer
const inputValidation 		= both(is(String), lengthGte(MIN_ANSWER_LENGTH))

// PARAM: answers
const completed				= both(lengthEq(questions.length), all(inputValidation))

// PARAM: record
const memorized				= c(gt(0), prop('memorizeDate'))

// PARAM: pronunciation
const pronunciationEmpty = c(isNilOrEmpty, prop('pronunciation'))
// PARAM: url of voice
const urlEmpty = c(isNilOrEmpty, prop('url'))


/*  *  *  *  *  *  *  *  *  *  *  E X P O R T S  *  *  *  *  *  *  *  *  *  *  */

export const m = f => c(f, prop('main'))

export const get = {
	mainObj,
	me, 
	records, record, searchDate, recordsObj, recordsStatus, recordsLoading, index, term, termObj, step, stepObj, recordsObj, save,
	filter, filterObj, choise, lastSearchDate, moreStatusObj,
	indexByTerm, memorizeDateOfIndex,
	responses, response, responseObj, responseOf, responseLoading, meaningNotFound, meaningDidYouMean, meaningNotValid,
	answers, answer
}
export const set = {
	setAnswer, memorizeDate, order
}
export const helpers = {
	sortBySearchDate, meaningFound, inputValidation, completed, pronunciationEmpty, urlEmpty
}

/*  *  *  *  *  *  *  *  AUTH  *  *  *  *  *  *  *  */

export const authInObj = pick(['auth'])

const getScreen = path(['auth', 'screen'])
export const screenInObj = c(objOf('screen'), getScreen)

const authStatusPathEq = pathEq(['auth', 'authStatus'])
export const isInitializing = authStatusPathEq(authStatusConst.INITIALIZING)

export const isNotAuthError = c(isNil, path(['auth', 'error']))

export const getOperating = path(['auth', 'operating'])
export const operatingInObj = c(objOf('operating'), getOperating)


/*
const state = { 
		auth: { uid: 123452342, name: 'ali'},
		main: {term: 'world'}
	}
	const main = pick(['main'])
	const term = prop('term')
	main.term = c(term, prop('main'))

	console.log('main: ', main(state))
	console.log('term: ', main.term(state))

	// yukardakilerin haricinde flexPath ve varsa composeBy işlevleri
*/