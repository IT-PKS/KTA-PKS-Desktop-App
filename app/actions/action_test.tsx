import { Action, Dispatch } from 'redux';
import { TICK, INCREMENT, DECREMENT, RESET } from './types';
import { Tick, Increment, Decrement, Reset } from './action_test.types';

export const startClock = () => (dispatch: Dispatch<Tick>): Action => {
  return dispatch({ type: TICK, timestamp: new Date().getTime() });
};

export const incrementCount = () => (dispatch: Dispatch<Increment>): Action => {
  return dispatch({ type: INCREMENT });
};

export const decrementCount = () => (dispatch: Dispatch<Decrement>): Action => {
  return dispatch({ type: DECREMENT });
};

export const resetCount = () => (dispatch: Dispatch<Reset>): Action => {
  return dispatch({ type: RESET });
};
