declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.eot';
declare module '*.ttf';
declare module '*.otf';
declare module '*.woff';
declare module '*.woff2';

declare module 'kta' {
  export type Noop = (...args: any[]) => any;

  export type ReduxState = {
    test: {
      lastUpdate: number;
      count: number;
    };
  };
}
