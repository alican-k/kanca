import 'rxjs'
import { Observable } from 'rxjs/Observable'
import firebase from 'react-native-firebase'
import { compose, dissoc, map } from 'ramda'
import { filterConst, RECORD_LIMIT } from '../constants';

const db = firebase.firestore()
const auth = firebase.auth()

export const getUid = () => firebase.auth().currentUser.uid

export const authState$ = () => Observable.create(observer => {
	firebase.auth().onAuthStateChanged(user => {
		if(user) {
			if(user.isAnonymous)
				observer.next(null)
			else {
				user.getIdToken(true)
					.then(token => observer.next(user))
					.catch(error => observer.next(null))
			}
		}
		else {
			observer.next(user)
		}
	})	
})

export const signUp = (email, password) => 
	auth.createUserWithEmailAndPassword(email, password)

export const createUserData = userData => 
	db.collection('Users').doc(getUid()).set(userData)

export const logIn = (email, password) => 
	auth.signInWithEmailAndPassword(email, password)

export const logOut = () => 	
	auth.signOut()

export const reset = (email) =>
	auth.sendPasswordResetEmail(email)

export const loadUserData = () =>
	db.collection('Users').doc(getUid()).get().then(documentCallback)

export const prepareRecords = () =>
	db.collection('Records').doc(getUid()).set({ count: 0 })

/* lastTerm veya searchDate, filterChoice
 * belirli bir tarihten önceki belirli sayıda kaydı, memorizationDate e göre seçecek.
*/
// export const loadRecords = (params = {}) => {
// 	console.log('params: ', params)
// 	const { choise } = params
// 	console.log('choise: ', choise)
// 	const allRecords = getRecords()
// 	let filteredRecords

// 	if(Boolean(choise) && choise === filterConst.MEMORIZED)
// 		filteredRecords = allRecords.where('memorized', '==', true)
// 	else if(Boolean(choise) && choise === filterConst.NOT_MEMORIZED)
// 		filteredRecords = allRecords.where('memorized', '==', false)
// 	else filteredRecords = allRecords

// 	return filteredRecords.get().then(recordsToArray)
// }

// choise MEMORIZED ise veya NOT_MEMORIZED ise order'a göre sıralamakta sorun yok.
// choise ALL veya undefined ise searchDate'e göre seçmek lazım.

// export const loadRecords = (params = {}) => {
// 	console.log('params: ', params)
	
// 	const { choise, searchDate } = params
// 	console.log('choise: ', choise, ' searchDate: ', searchDate)
	
// 	const low = choise === filterConst.MEMORIZED ? 'b' : 'a'
// 	const high = choise === filterConst.NOT_MEMORIZED ? 'b' : 'c'

// //	const orderBy = choise !== filterConst.MEMORIZED && choise !== filterConst.NOT_MEMORIZED ? 'searchDate' : 'order'
	
// 	console.log('low: ', low, ' high: ', high)
	
// 	return getRecords()
// 		.orderBy('order', 'desc')
// 		.where('order', '<', high)
// 		.where('order', '>', low)
// 		.get()
// 		.then(recordsToArray)
// }

export const loadRecords = (params = {}) => {
	console.log('params: ', params)
	
	const { choise, searchDate } = params

	if(choise === filterConst.ALL) {
		return getRecords()
			.orderBy('searchDate', 'desc')
			.startAfter(searchDate)
			.limit(RECORD_LIMIT)
			.get()
			.then(recordsToArray)
	} else {
		const low = choise === filterConst.MEMORIZED ? 'b' : 'a'
		// const high = choise === filterConst.NOT_MEMORIZED ? 'b' : 'c'
		const high = (choise === filterConst.NOT_MEMORIZED ? 'a' : 'b') + searchDate		

		return getRecords()
			.orderBy('order', 'desc')
			.where('order', '<', high)
			.where('order', '>', low)
			.limit(RECORD_LIMIT)
			.get()
			.then(recordsToArray)
	} 
}

export const saveSearchDate = (term, time, order) => 
	getRecords().doc(term).update({ searchDate: time, order })

export const saveNewRecord = (record) => 
	getRecords().doc(record.term).set(dissoc('term', record))

export const saveAnswers = (term, answers, memorizeDate, order) =>
	getRecords().doc(term).update({ answers, memorizeDate, order }).catch(err => console.log('err: ', err))

	
// * * * * * //


const getRecords = () => db.collection('Records').doc(getUid()).collection('records')

const documentCallback = doc => doc.data()
	
const recordsToArray = snap => {
	const arr = []
	snap.forEach(doc => arr.push({term: doc.id, ...doc.data()}))
	return arr
}