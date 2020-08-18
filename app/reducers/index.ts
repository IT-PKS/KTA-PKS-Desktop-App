import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import testReducer from './reducer_test'; // for testing only

const rootReducer = combineReducers({
  form: formReducer,
  test: testReducer, // for testing only
});

export default rootReducer;
