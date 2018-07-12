import { __, compose, keys, map, prop, objOf } from 'ramda'
import * as actionTypes from '../../actions/types'
import { 
	recordsLoaded, displayList, setCurrentTime, 
	setSearchFocused, search, meaningFetched, displayRecord, setStep, recordUnmount, setAnswer, complete
} from '../../actions'
import reducer from '../main'
import { initialMain, createRecordArray, sampleMeaning, newRecord } from '../../dump'
import {get, set} from '../../helpers/state'
import { listsConst, statusConstSimple, statusConstWithNone } from '../../constants'

const m = objOf('main')
const initMain = () => reducer(undefined, {}) 
const reducerCurried = action => state => reducer(state, action)

describe('main reducer', () => {
	it('should return the initial state', () => {
		const main = initMain()
		expect(main).toEqual(initialMain)
	})

	it('currentList should be "redRecords"', () => {
		const action = recordsLoaded(listsConst.RED, [])
		const main = reducer(initMain(), action)
		const list = get.currentRecordsPropName(main)
		expect(list).toEqual('redRecords')

		const reds = get.currentRecords(main)
		expect(reds).toEqual([])
	})

	it('should have a non empty arrays after ' + actionTypes.RECORDS_LOADED + ' action ', () => {
		const reds = createRecordArray(listsConst.RED, 4)
		const action1 = recordsLoaded(listsConst.RED, reds)
		const main1 = reducer(initMain(), action1)
		const records1 = get.currentRecords(main1)
		const status1 = get.currentStatus(main1)
		expect(records1).toHaveLength(4)
		expect(records1[1].term).toEqual('windowRED102')
		expect(status1).toEqual(statusConstSimple.LOADED)

		const oranges = createRecordArray(listsConst.ORANGE, 4)
		const action2 = recordsLoaded(listsConst.ORANGE, oranges)
		const main2 = reducer(initMain(), action2)
		const records2 = get.orangeRecords(main2)
		const status2 = get.orangeStatus(main2)
		expect(records2).toHaveLength(4)
		expect(records2[1].term).toEqual('windowORANGE102')
		expect(status2).toEqual(statusConstSimple.LOADED)
	})

	it('should handle set search focused', () => {
		const main = initMain()
		expect(get.searchFocused(main)).toEqual(false)
	})

	it('should handle display list', () => {
		const main = reducer(initMain(), displayList(listsConst.ORANGE))
		const currentRecordsProp1 = get.currentRecordsPropName(main)
		const currentStatusProp1 = get.currentStatusPropName(main)
		expect(currentRecordsProp1).toEqual('orangeRecords')
		expect(currentStatusProp1).toEqual('orangeStatus')
	})

	it('should handle set time', () => {
		const time = Date.now()
		const main = reducer(initMain(), setCurrentTime(time))
		expect(get.currentTime(main)).toEqual(time)
	})

	it('should handle search and meaning fetched ', () => {
		const main = compose(
			reducerCurried(search('as ')),
			reducerCurried(setSearchFocused(true)),
			reducerCurried(recordsLoaded(listsConst.RED, [])),
		)(initMain())

		const responseObj = get.responses(main)
		expect(keys(responseObj)).toHaveLength(1)
		const asStatus = get.response('as')(main)
		expect(asStatus.fetchStatus).toEqual(statusConstSimple.LOADING)

		const main2 = reducer(main, search('as'))
		const responseObj2 = get.responses(main2)
		expect(keys(responseObj2)).toHaveLength(1)
		const asStatus2 = get.response('as')(main2)
		expect(asStatus2.fetchStatus).toEqual(statusConstSimple.LOADING)

		const action = meaningFetched(listsConst.RED, ' As', sampleMeaning, Date.now())
		const main3 = reducer(main2, action)
		const asStatus3 = get.response('as')(main3)
		expect(asStatus3.fetchStatus).toEqual(statusConstSimple.LOADED)
		expect(asStatus3.meaning).toBeTruthy()

		const action4 = meaningFetched(listsConst.RED, 'As', sampleMeaning, Date.now())
		const main4 = reducer(main3, action4)
		const reds4 = get.redRecords(main4)
		expect(reds4).toHaveLength(1)

		const action5 = meaningFetched(listsConst.RED, 'desk', sampleMeaning, Date.now())
		const main5 = reducer(main4, action5)
		const reds5 = get.redRecords(main5)
		expect(reds5).toHaveLength(2)
		expect(reds5[0].term).toEqual('desk')
		expect(reds5[1].term).toEqual('as')

		const action6 = meaningFetched(listsConst.RED, 'as', sampleMeaning, Date.now())
		const main6 = reducer(main5, action6)
		const reds6 = get.redRecords(main6)
		expect(reds6).toHaveLength(2)
		expect(reds6[0].term).toEqual('as')
		expect(reds6[1].term).toEqual('desk')
	})

	it('should  handle display record', () => {
		const reds = createRecordArray(listsConst.RED, 4)
		const main = compose(
			reducerCurried(displayRecord(listsConst.RED, 'windowRED101')),
			reducerCurried(recordsLoaded(listsConst.RED, reds)),
		)(initMain())
		const redIndex = get.currentIndex(main)
		expect(redIndex).toEqual(2)
	})

	it('should handle record unmount and set step', () => {
		const reds = createRecordArray(listsConst.RED, 4)
		const main = compose(
			reducerCurried(setStep(2)),			
			reducerCurried(displayRecord(listsConst.RED, 'windowRED101')),
			reducerCurried(recordsLoaded(listsConst.RED, reds)),
		)(initMain())

		expect(get.currentStep(main)).toEqual(2)

		const main2 = reducer(main, recordUnmount())
		expect(get.currentStep(main2)).toEqual(0)
		expect(get.currentIndex(main2)).toEqual(null)
	})
	it('should handle set answer', () => {
		const reds = createRecordArray(listsConst.RED, 4)
		const main = compose(
			reducerCurried(setAnswer('cevap 0')),		
			reducerCurried(displayRecord(listsConst.RED, 'windowRED101')),
			reducerCurried(recordsLoaded(listsConst.RED, reds)),
		)(initMain())

		expect(get.currentAnswer(main)).toEqual('cevap 0')

		const main2 = compose(
			reducerCurried(setAnswer('cevap 1')),		
			reducerCurried(setStep(1))
		)(main)

		expect(get.currentRecord(main2).answers).toEqual(['cevap 0', 'cevap 1'])
	})

	it('should validate properly', () => {
		const reds = createRecordArray(listsConst.RED, 4)
		const main1 = compose(
			reducerCurried(displayRecord(listsConst.RED, 'windowRED101')),
			reducerCurried(recordsLoaded(listsConst.RED, reds)),
		)(initMain())
		expect(get.currentAnswersValidation(main1)).toEqual(false)

		const setStepAndAnswer = step => compose(
			reducerCurried(setAnswer('cevap -- ' + step)),
			reducerCurried(setStep(step))
		)

		const main2 = setStepAndAnswer(0)(main1)
		expect(get.currentAnswersValidation(main2)).toEqual(false)

		const main3 = setStepAndAnswer(7)(main2)
		expect(get.currentAnswersValidation(main3)).toEqual(false)

		const main4 = compose(
			setStepAndAnswer(7),
			setStepAndAnswer(6),
			setStepAndAnswer(5),
			setStepAndAnswer(4),
			setStepAndAnswer(3),
			setStepAndAnswer(2),
			setStepAndAnswer(1),			
			setStepAndAnswer(0),
		)(main3)

		expect(get.currentAnswersValidation(main4)).toEqual(true)
	})

	it('should handle complete', () => {
		const reds = createRecordArray(listsConst.RED, 4)
		const oranges = createRecordArray(listsConst.ORANGE, 4)
		const greens = createRecordArray(listsConst.GREEN, 4)
		
		const main = compose(
			reducerCurried(complete()),
			reducerCurried(displayRecord(listsConst.GREEN, 'windowGREEN101')),
			reducerCurried(displayList(listsConst.GREEN)),

			reducerCurried(complete()),
			reducerCurried(displayRecord(listsConst.ORANGE, 'windowORANGE101')),
			reducerCurried(displayList(listsConst.ORANGE)),
			
			reducerCurried(complete()),	
			reducerCurried(displayRecord(listsConst.RED, 'windowRED101')),
			reducerCurried(recordsLoaded(listsConst.GREEN, greens)),
			reducerCurried(recordsLoaded(listsConst.ORANGE, oranges)),
			reducerCurried(recordsLoaded(listsConst.RED, reds)),
		)(initMain())

		const redTerms = map(prop('term'))(get.redRecords(main))
		const orangeTerms = map(prop('term'))(get.orangeRecords(main))
		const greenTerms = map(prop('term'))(get.greenRecords(main))

		expect(redTerms).toEqual(['windowRED103', 'windowRED102', 'windowRED100'])
		expect(orangeTerms).toEqual(['windowRED101', 'windowORANGE103', 'windowORANGE102', 'windowORANGE100'])
		expect(greenTerms).toEqual(['windowORANGE101', 'windowGREEN103', 'windowGREEN102', 'windowGREEN101', 'windowGREEN100'])
	})
})
