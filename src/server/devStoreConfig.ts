import { createStore, Store, applyMiddleware } from 'redux';
import rootReducer from '../client/reducers';
import thunk from 'redux-thunk';
import { logger, crashReporter } from '../client/utils/reduxMiddlewares';

const devStoreConfig = (preloadedState: any): Store => {
	const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger, crashReporter));

	// @ts-ignore
	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		// @ts-ignore
		module.hot.accept('../client/reducers', () => {
			const nextRootReducer = require('../client/reducers');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
};

export default devStoreConfig;
