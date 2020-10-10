import { css } from '@emotion/core';
import { Theme } from '../../components/base/src/theme';
import { safeCssUrl } from '../../components/base/src/utils';

// Images
import bgImg from '../../components/base/src/img/bg.png';

const createStyles = (t: Theme) => {
  return {
    global: css`
      /* ----- Ignore ----- */
      #root {
        padding: 0;
      }
      /* ----- End ignore ----- */

      html,
      body,
      #root {
        width: 100%;
        height: 100%;
      }

      body {
        background-color: #f0f0f0;
        background-image: url(${safeCssUrl(bgImg)});
        background-repeat: repeat;
        background-position: left top;
        background-attachment: fixed;
      }
    `,
    wrapper: css`
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    panel: css`
      width: 100%;
      max-width: 360px;
      padding: 0;
    `,
    header: css`
      position: relative;
      padding: ${t.spacing.ml}px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;

      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
      }

      &::before {
        width: 75%;
        background-color: ${t.color.yellowPrimary};
        z-index: 1;
      }

      &::after {
        width: 100%;
        background-color: ${t.color.darkPrimary};
        z-index: 0;
      }
    `,
    headerText: css`
      margin-left: ${t.spacing.s}px;

      h3 {
        margin-bottom: 0;
      }
    `,
    form: css`
      padding: ${t.spacing.ml}px;
    `,
    buttonContainer: css`
      margin-top: ${t.spacing.xl}px;
      text-align: center;
    `,
  };
};

export default createStyles;
