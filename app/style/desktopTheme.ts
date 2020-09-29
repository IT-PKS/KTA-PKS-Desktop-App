import facepaint from 'facepaint';
import { CSSObject } from '@emotion/styled-base';

// Animation
const animation = {
  timing: {
    instant: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    instant: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Color
// format: Primary, Secondary, Neutral, Stain
const color = {
  // light and dark format color: Primary, Neutral, Stain, Secondary
  lightPrimary: '#ffffff',
  lightStain: '#fafafa',
  lightNeutral: '#cccccc',
  lightSecondary: '#aaaaaa',

  darkPrimary: '#212529',

  // the rest is: Primary, Secondary, Dark, Light
  yellowLight: 'rgba(250, 203, 0, 0.5)',
  yellowDark: '#FACB00',
  yellowPrimary: '#f8cb50',
  yellowSecondary: '#d9b000',

  bluePrimary: '#0194f3',
  blueSecondary: '#007ce8',
  blueDark: '#0264c8',
  blueLight: '#ecf8ff',

  redPrimary: '#ce352d',

  greenPrimary: '#47b920',

  gray: '#F0F0F0',
  grayLight: '#E5E5E5',
  grayDark: '#EBEBEB',


} as const;

// Opacity
const opacity = {
  opaque: 0.8,
  obscure: 0.65,
  translucent: 0.5,
  washedOut: 0.4,
  seeThrough: 0.2,
  clear: 0.15,
} as const;

// Spacing
const spacing = {
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  ml: 20,
  l: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
  xxxxl: 56,
} as const;

// Typography
const typography = {
  family: {
    sansSerif:
      '"Open Sans", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    monospace:
      'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  weight: {
    regular: 400,
    medium: 600,
    bold: 700,
  },
  size: {
    gigantic: 32,
    huge: 24,
    big: 20,
    large: 16,
    medium: 14,
    small: 12.8,
    tiny: 11,
  },
  lineHeight: 1.5,
} as const;

// Breakpoints
export const breakpoints = {
  sm: 540,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

export const mq: (style: { [key in keyof CSSObject]: Array<string | number> }) => any = facepaint([
  `@media(min-width: ${breakpoints.sm}px)`,
  `@media(min-width: ${breakpoints.md}px)`,
  `@media(min-width: ${breakpoints.lg}px)`,
  `@media(min-width: ${breakpoints.xl}px)`,
]);

// Grid
const grid = {
  gutter: spacing.ml,
  column: 12,
  container: {
    sm: 480,
    md: 720,
    lg: 960,
    xl: 1140,
  },
} as const;

// Z-index
const zIndex = {
  dropdownMenu: 1020,
  tooltip: 1040,
} as const;

const theme = {
  animation,
  breakpoints,
  color,
  grid,
  mq,
  opacity,
  spacing,
  typography,
  zIndex,
};

export type Theme = typeof theme;

export default theme;
