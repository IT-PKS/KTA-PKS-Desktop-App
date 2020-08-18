import update from 'immutability-helper';
import { ReduxState } from 'kta';
import { TICK, INCREMENT, DECREMENT, RESET } from 'actions/types';
import { ActionTypes } from 'actions/action_test.types';

type State = ReduxState['test'];

const INITIAL_STATE: State = {
  lastUpdate: 0,
  count: 0,
};

export default function (state: State = INITIAL_STATE, action: ActionTypes): State {
  switch (action.type) {
    case TICK:
      return update(state, {
        lastUpdate: { $set: action.timestamp },
      });
    case INCREMENT:
      return update(state, {
        count: { $set: state.count + 1 },
      });
    case DECREMENT:
      return update(state, {
        count: { $set: state.count - 1 },
      });
    case RESET:
      return update(state, {
        count: { $set: INITIAL_STATE.count },
      });
    default:
      return state;
  }
}
