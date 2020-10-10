import { css } from '@emotion/core';
import { Theme } from '../../../components/base/src/theme';

const createStyles = (t: Theme) => {
  return {
    ringkasan__container: css`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    `,
    white__card__custom: css`
      background-color: #fff;
      padding: 20px;
      border-radius: 4px;
      width: 337px;
      margin: 0px 0px 40px 20px;
    `,
    heading: css`
      color: ${t.color.lightSecondary};
      margin-bottom: 20px;

      ${t.mq({
      fontSize: [t.typography.size.big, t.typography.size.huge],
    })};
    `,
    number__total__data: css`
      color: black;
      line-height: 150%;
      ${t.mq({
      fontSize: 36,
    })};
    `,
    se__indonesia: css`
      color: ${t.color.lightSecondary};
      display: block;
    `,
    odd__row: css`
      display: flex;
      justify-content: space-between;
      background-color: rgba(250, 203, 0, 0.1);
      padding: 10px;
      width: 297px;
      heigth: 41px;
      color: black;
    `,
    even__row: css`
      display: flex;
      justify-content: space-between;
      background-color: white;
      padding: 10px;
      width: 297px;
      heigth: 41px;
      color: black;
    `,
  };
};

export default createStyles;
