import * as types from './types'

const ac = (type, payload) => ({type, payload})

/* * * * * A C T I O N S * * * * * */

export const startup 			= ()						=> ac(types.STARTUP)

export const notLoggedIn 		= ()						=> ac(types.NOT_LOGGED_IN)
export const loggedIn 			= (uid)						=> ac(types.LOGGED_IN, { uid })
export const logIn 				= (email, password)			=> ac(types.LOG_IN, { email, password })
export const logOut 			= ()						=> ac(types.LOG_OUT)
export const signUp 			= (name, email, password)	=> ac(types.SIGN_UP, { name, email, password })
export const reset 				= (email)					=> ac(types.RESET, { email })
export const sent 	 			= ()						=> ac(types.SENT)
export const authError 			= (error)					=> ac(types.AUTH_ERROR, { error })
export const closeAuthError 	= ()						=> ac(types.CLOSE_AUTH_ERROR)
export const displayAuth	 	= (screen)					=> ac(types.DISPLAY_AUTH, { screen })

export const routeNavigate 	= (routeName, params = {}) 		=> ac(types.ROUTE_NAVIGATE,{routeName, params})
export const routeReset 	= (routeName, params = {}) 		=> ac(types.ROUTE_RESET, {routeName, params})
export const routeBack 		= (routeName) 					=> ac(types.ROUTE_BACK, {routeName})

export const quoteRequest 	= () 					=> ac(types.QUOTE_REQUEST)
export const quoteFulfilled = (response) 			=> ac(types.QUOTE_FULFILLED, { response })
export const quoteError 	= (err)					=> ac(types.QUOTE_ERROR, { err })

