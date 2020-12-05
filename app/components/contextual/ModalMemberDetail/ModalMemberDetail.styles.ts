import { css } from '@emotion/core';
import { Theme } from 'components/base';
import { rgba } from 'polished';

const createStyles = (t: Theme) => {
  return {
    heading: css`
      color: ${t.color.lightSecondary};
      margin-bottom: ${t.spacing.s}px;
    `,
    table: css`
      table-layout: fixed;
      width: 100%;
      margin-bottom: ${t.spacing.ml}px;

      tbody tr {
        td:nth-of-type(1) {
          width: 30%;
        }
        td:nth-of-type(2) {
          width: ${t.spacing.s}px;
        }
      }
    `,
    map: css`
      margin-bottom: ${t.spacing.xs}px;
      border-color: ${rgba(t.color.lightNeutral, 0.75)};
    `,
    photoLabel: css`
      margin-bottom: ${t.spacing.xxs}px;
    `,
    imgContainer: css`
      width: 100%;
      height: 190px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${t.color.lightStain};
      border-radius: ${t.border.radius.default}px;
      overflow: hidden;
      margin-bottom: ${t.spacing.xs}px;

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    `,
  };
};

export default createStyles;
