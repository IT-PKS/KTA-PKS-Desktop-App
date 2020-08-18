import { Action, Dispatch } from 'redux';
import { TICK, INCREMENT, DECREMENT, RESET } from './types';
import { Tick, Increment, Decrement, Reset } from './action_test.types';

export const serverRenderClock = (isServer: boolean) => (dispatch: Dispatch<Tick>): Action => {
  return dispatch({ type: TICK, light: !isServer, timestamp: Date.now() });
};

export const startClock = (dispatch: Dispatch<Tick>): NodeJS.Timer => {
  return setInterval(() => {
    // Dispatch `TICK` every 1 second
    dispatch({ type: TICK, light: true, timestamp: Date.now() });
  }, 1000);
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
