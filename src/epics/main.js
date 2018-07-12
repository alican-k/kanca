import 'rxjs'
import { Observable } from 'rxjs/Observable'
import fir from 'react-native-firebase'
import Sound from 'react-native-sound'
import RNFetchBlob from 'rn-fetch-blob'
import { defaultTo } from 'ramda'
import * as actionTypes from '../actions/types'
import { 
	routeNavigate, routeReset, 
	userDataLoaded, 
	recordsLoaded, setCurrentTime, displayFetched, searchFetched } from '../actions'
import { loadUserData, loadRecords, saveNewRecord, saveSearchDate, saveAnswers } from '../helpers/requests'
import { search as fetchTerm } from '../helpers/seslisozluk'
import { get } from '../helpers/state'
import {sampleMeaning, sampleRecords} from '../dump'
import { saveTypeConst } from '../constants'

const { of, concat, fromPromise, empty, timer } = Observable

export const loggedInEpic = action$ => action$.ofType(actionTypes.LOGGED_IN)
	.switchMap(action => concat(
		of(routeReset('List')),
		of(setCurrentTime(Date.now())),
		fromPromise(loadUserData())
			.map(userDataLoaded),
		fromPromise(loadRecords())
			.map(recordsLoaded)
	))

export const searchEpic = (action$, store) => action$.ofType(actionTypes.SEARCH)
	.switchMap(action => {
		const { term, time } = action.payload

		return concat(
			of(routeNavigate('Record')),			
			get.responseLoading(main(store))
				? fromPromise(fetchTerm(term))
					.map(meaning => searchFetched(term, meaning, time))
				: empty(),
			get.save(main(store)).type === saveTypeConst.SEARCH_DATE
				? fromPromise(saveSearchDate(term, time))
					.ignoreElements()
				: empty()
		)
	})

export const searchFetchedEpic = (action$, store) => action$.ofType(actionTypes.SEARCH_FETCHED)
	.switchMap(action => {
		const {type, data} = get.save(main(store))
		return type === saveTypeConst.NEW_RECORD
			? fromPromise(saveNewRecord(data))
				.ignoreElements()			
			: empty()
	})

export const displayEpic = (action$, store) => action$.ofType(actionTypes.DISPLAY)
	.switchMap(action => {
		const { term } = action.payload

		return concat(
			of(routeNavigate('Record')),
			get.responseLoading(main(store))
				? fromPromise(fetchTerm(term))
					.map(meaning => displayFetched(term, meaning, Date.now()))
				: empty()
		)
	})

export const setAnswerEpic = (action$, store) => action$.ofType(actionTypes.SET_ANSWER)
	.switchMap(action => saveAnswers(get.term(main(store)), get.answers(main(store))))
	.ignoreElements()

export const editUnmountEpic = (action$, store) => action$.ofType(actionTypes.EDIT_UNMOUNT)
	.switchMap(() => {
		const {term, answers, memorizeDate} = get.save(main(store)).data
		return fromPromise(saveAnswers(term, answers, memorizeDate))
			.ignoreElements()
	})

export const playEpic = (action$, store) => action$.ofType(actionTypes.PLAY)
	.switchMap(action => sound$('http://static.seslisozluk.net/' + action.payload.url))
	.do(sound => {
		if(sound)
			sound.play()
	})
	.ignoreElements()

const main = store => store.getState().main

const sound$ = url => Observable.create(observer => {
	RNFetchBlob
		.config({fileCache : false, appendExt : 'mp3'})
		.fetch('GET', url, { })
		.then(res => {
			const path = res.path()
			const sound = new Sound(path, '', (error) => {
				if (error) {
					console.log('failed to load the sound', error)
					observer.next(null)
					observer.complete()
				}
				else {
					observer.next(sound)
					observer.complete()
				}
			})
		}).catch(e => console.log('error: ', e))
})