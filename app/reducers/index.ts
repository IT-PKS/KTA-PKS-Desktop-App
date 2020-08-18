import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// test
import testReducer from './reducer_test';

const rootReducer = combineReducers({
  form: formReducer,
  // test
  test: testReducer,
});

export default rootReducer;
