import { css } from '@emotion/core';
import { Theme } from '../../theme';
import loginBackground from '../../base/src/img/bg.png'

const createStyles = (t: Theme) => {
  return {
    content__bacground: css`
        display:flex;
        background-image: url(${loginBackground});
        background-repeat: repeat;
        background-position: left top;
        background-attachment: fixed;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        z-index: -200;
        overflow-x: auto;
      `,
    content: css`
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: 4px;
        margin-bottom: 40px;
        left: 340px;
        top: 126px;
        position: absolute;
        right: 40px;
        padding: 50px;
        padding-right: 50px;
        padding-left: 40px;
        transition: all 0.5s;
        @media screen and (min-width: 320px) and (max-width: 1024px) {
          left: 90px;
        }
    `,
    content__minimize: css`
      left: 90px;
    `
  };
};

export default createStyles;
