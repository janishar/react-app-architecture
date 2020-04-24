import { createStore, Store, applyMiddleware } from 'redux';
import rootReducer, { RootState } from '../reducers';
import thunk from 'redux-thunk';
import { logger, crashReporter } from '../utils/reduxMiddlewares';

const devStoreConfig = (preloadedState: Partial<RootState>): Store => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger, crashReporter),
  );

  // @ts-ignore
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // @ts-ignore
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default devStoreConfig;
