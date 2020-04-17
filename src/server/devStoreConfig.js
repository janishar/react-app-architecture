// @flow
import { createStore, applyMiddleware } from 'redux'
import RootReducer from '../client/reducers'

const devStoreConfig = (preloadedState: Object) => {
	const store = createStore(
		RootReducer,
		preloadedState
	)

	// $FlowFixMe
	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		// $FlowFixMe
		module.hot.accept('../client/reducers', () => {
			const nextRootReducer = require('../client/reducers')
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}

export default devStoreConfig