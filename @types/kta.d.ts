declare module '*.png';
declare module '*.jpg';
declare module '*.svg';

declare module 'kta' {
  export type Noop = (...args: any[]) => any;

  export type ReduxState = {
    test: {
      lastUpdate: number;
      light: boolean;
      count: number;
    };
  };
}
