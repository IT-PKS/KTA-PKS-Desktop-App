import { css } from '@emotion/core';
import { Theme } from '../../theme';

const createStyles = (t: Theme) => {
  return {
    table__container: css`
      width: 100%;
      text-align: left;
      border-radius: 100px !important;
    `,
    table: css`
      width: 100%;
      border: none;
      border-collapse:collapse; 
      border-radius: 5px;
    `,
    table__thead: css`
      background-color: #000;
      color: white;
      padding: 18px;  
      font-size: 18px;
    `,
  };
};

export default createStyles;
