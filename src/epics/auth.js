import 'rxjs'
import { Observable } from 'rxjs/Observable'
import * as actionTypes from '../actions/types'
import { authScreenConst } from '../constants'
import { authError, closeAuthError, loggedIn, notLoggedIn, routeReset, sent, displayAuth } from '../actions'
import { authState$, signUp, createUserData, prepareRecords, logOut, logIn, reset } from '../helpers/requests'
import validations from '../helpers/validations'

const { empty, of, concat, fromPromise } = Observable

export const authStateEpic = action$ => action$.ofType(actionTypes.STARTUP)
	.switchMapTo(authState$())
	.map(user => user ? loggedIn(user.uid) : notLoggedIn())

export const signUpEpic = action$ => action$.ofType(actionTypes.SIGN_UP)
	.delay(200)
	.switchMap(action => {
		const { name, email, password } = action.payload
		const err = validations.signUpName(name) 
		return err 
			? of(authError(err))
			: fromPromise(signUp(email, password))
				.switchMap(() => createUserData({ name }))
				.switchMap(() => prepareRecords())
				.ignoreElements()
				.catch(err => of(authError(err)))
	})

export const logOutEpic = action$ => action$.ofType(actionTypes.LOG_OUT)
	.switchMap(() => logOut())
	.mapTo(routeReset('Auth'))

export const logInEpic = action$ => action$.ofType(actionTypes.LOG_IN)
	.delay(200)
	.switchMap(action => {
		const { email, password } = action.payload
		return fromPromise(logIn(email, password))
			.ignoreElements()
			.catch(err => of(authError(err)))
	})

export const resetEpic = action$ => action$.ofType(actionTypes.RESET)
	.delay(200)
	.switchMap(action => {
		const { email } = action.payload
		return fromPromise(reset(email))
			.mapTo(sent())
			.catch(err => of(authError(err)))
	})

export const authErrorEpic = (action$, store) => action$.ofType(actionTypes.AUTH_ERROR)
	.switchMapTo(of(closeAuthError()).delay(3000))

export const sentEpic = (action$, store) => action$.ofType(actionTypes.SENT)
	.mapTo(displayAuth(authScreenConst.SENT))