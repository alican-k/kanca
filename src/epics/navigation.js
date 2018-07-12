import 'rxjs'
import { Observable } from 'rxjs/Observable'
import * as actionTypes from '../actions/types'
import { reset, navigate, back } from '../helpers/navigation'

export const navigateEpic = action$ => action$.ofType(actionTypes.ROUTE_NAVIGATE)
	.do(action => {
		const { routeName, params } = action.payload
		// const routeNameOrModal = routeName === 'Meditation' ? 'MeditationModal' : routeName
		return navigate(routeName, params)
	})
	.ignoreElements()

export const resetEpic = action$ => action$.ofType(actionTypes.ROUTE_RESET)
	.do(action => reset(action.payload.routeName, action.payload.params))
	.ignoreElements()

export const backEpic = action$ => action$.ofType(actionTypes.ROUTE_BACK)
	.do(action => back(action.payload.routeName))
	.ignoreElements()

