import { TICK, INCREMENT, DECREMENT, RESET } from './types';

// Action Definition
export interface Tick {
  type: typeof TICK;
  timestamp: number;
}

export interface Increment {
  type: typeof INCREMENT;
}

export interface Decrement {
  type: typeof DECREMENT;
}

export interface Reset {
  type: typeof RESET;
}

// Union Action Types
export type ActionTypes = Tick | Increment | Decrement | Reset;
