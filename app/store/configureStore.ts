import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = () => {
  const composeEnhancers =
    typeof (window as any) === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;
  const enhancer = composeEnhancers(applyMiddleware(thunk));

  return createStore(rootReducer, enhancer);
};

export default configureStore;
