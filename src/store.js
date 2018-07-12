import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootEpic from './epics'
import rootReducer from './reducers'

const epicMiddleware = createEpicMiddleware(rootEpic)

const composeEnhancers = composeWithDevTools({
	// Specify here name, actionsBlacklist, actionsCreators and other options if needed
})

export default createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(epicMiddleware))
)