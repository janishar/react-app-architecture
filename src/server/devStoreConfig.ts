import { createStore, Store } from 'redux';
import RootReducer from '../client/reducers';

const devStoreConfig = (preloadedState: any): Store => {
	const store = createStore(RootReducer, preloadedState);

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
