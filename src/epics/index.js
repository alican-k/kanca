import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable'
import { startup } from '../actions'
import { authStateEpic, signUpEpic, logOutEpic, logInEpic, resetEpic as resetPasswordEpic, 
	authErrorEpic, sentEpic } from './auth'
import { navigateEpic, resetEpic, backEpic } from './navigation'
import { loggedInEpic, searchEpic, displayEpic, searchFetchedEpic, editUnmountEpic, playEpic, recordsLoadEpic } from './main'

const startupEpic = () => Observable.of(startup()).delay(50)

export default combineEpics(
	startupEpic,

	authStateEpic, signUpEpic, loggedInEpic, logOutEpic, logInEpic, resetPasswordEpic, authErrorEpic, sentEpic,
	
	navigateEpic, resetEpic, backEpic,
	
	displayEpic, searchEpic, searchFetchedEpic, editUnmountEpic, playEpic, recordsLoadEpic
)