declare module '*.png';
declare module '*.jpg';
declare module '*.svg';

declare module 'electron-log/renderer' {
  import ElectronLog from 'electron-log';
  export default ElectronLog;
}

declare module 'icon-kit' {
  export type Noop = (...args: any[]) => any;
}
