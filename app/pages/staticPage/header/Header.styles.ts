import { css } from '@emotion/core';
import loginBackground from '../../resources/loginBackground.png'

const createStyles = (t: Theme) => {
  return {
    header: css`
      position: relative;
      display: flex;
      border-bottom: 6px solid ${t.color.yellowPrimary};
      background-color:${t.color.lightPrimary};
    `,
    image__header: css`
      width: 35.05px;
      height: 50px;
      margin-left: 20px;
      margin-top: 15px;
      margin-bottom: 21px;
    `,
    header__text: css`
      width: 255px;
      height: 50px;
      left: 69px;
      top: 15px;
      margin-left: 13.95px;
      margin-top: 13.95px;

      /* Heading 5 */
      font-family: Open Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 125%;

      /* or 25px */
      display: flex;
      align-items: center;
    `,

    header__separator__black: css`
      position: absolute;
      width: 306.72px; 
      right: 0;
      bottom: -6px;
      border-bottom: 6px solid ${t.color.darkPrimary};
    `,

    user__icon__container: css`
      position: absolute;
      top: 25px;
      right: 160px;
      color: ${t.color.redPrimary};
    `,
    user__name__container: css`
      position: absolute;
      top: 33px;
      right: 25px;
      color: black;
    `,
  };
};

export default createStyles;
