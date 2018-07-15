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

export const routeNavigate 		= (routeName, params = {}) 	=> ac(types.ROUTE_NAVIGATE,{routeName, params})
export const routeReset 		= (routeName, params = {}) 	=> ac(types.ROUTE_RESET, {routeName, params})
export const routeBack 			= (routeName) 				=> ac(types.ROUTE_BACK, {routeName})

export const userDataLoaded		= (data)					=> ac(types.USER_DATA_LOADED, { ...data })

export const setCurrentTime		= (currentTime)				=> ac(types.SET_CURRENT_TIME, { currentTime })

export const recordsLoaded		= (data)					=> ac(types.RECORDS_LOADED, { data })
export const recordsLoad 		= ()						=> ac(types.RECORDS_LOAD)

export const toggleModal		= (active)					=> ac(types.TOGGLE_MODAL, { active })
export const setFilter			= (choise)					=> ac(types.SET_FILTER, { choise })

export const search				= (term)					=> ac(types.SEARCH, { term, time: Date.now() })
export const searchFetched		= (term, meaning, time)		=> ac(types.SEARCH_FETCHED, {term, meaning, time})

export const display			= (term)					=> ac(types.DISPLAY, { term })
export const displayFetched		= (term, meaning, time)		=> ac(types.DISPLAY_FETCHED, {term, meaning, time})

export const play 				= (url) 					=> ac(types.PLAY, { url })

export const recordUnmount		= ()						=> ac(types.RECORD_UNMOUNT)

export const setAnswer			= (answer)					=> ac(types.SET_ANSWER, { answer })
export const setStep			= (step)					=> ac(types.SET_STEP, { step })
export const editUnmount		= ()						=> ac(types.EDIT_UNMOUNT, { time: Date.now() })