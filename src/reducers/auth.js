import * as actionTypes from '../actions/types'
import { authStatusConst, authScreenConst } from '../constants'

const initialState = {
	authStatus	: authStatusConst.INITIALIZING,       
	uid			: null,
	error		: null,
	screen		: authScreenConst.LOG_IN,
	operating	: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {

		case actionTypes.DISPLAY_AUTH: {
			const { screen } = action.payload
			return {...state, screen}
		}

		case actionTypes.SIGN_UP: {
			return {...state, operating: true}
		}

		case actionTypes.LOGGED_IN: {
			const { uid } = action.payload
			return { ...state, uid, authStatus: actionTypes.LOGGED_IN, operating: false }
		}

		case actionTypes.NOT_LOGGED_IN: {
			return {...state, uid: null, authStatus: actionTypes.NOT_LOGGED_IN, operating: false }
		}

		case actionTypes.LOG_IN: {
			return {...state, operating: true}
		}

		case actionTypes.RESET: {
			return {...state, operating: true}			
		}

		case actionTypes.SENT: {
			return {...state, operating: false}
		}

		case actionTypes.LOG_OUT: {
			return {...state, uid: null, screen: authScreenConst.LOG_IN}		
		}

		case actionTypes.AUTH_ERROR: {
			const { error } = action.payload
			const description = error.description || error.userInfo.NSLocalizedDescription
			const reason = error.reason || error.userInfo.NSLocalizedFailureReason
			return { ...state, error: {reason, description}, operating: false }
		}
		
		case actionTypes.CLOSE_AUTH_ERROR: {
			return { ...state, error: null }
		}
		
		default:
			return state
	}
}

export default reducer
