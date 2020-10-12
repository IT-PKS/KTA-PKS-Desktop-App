import { css } from '@emotion/core';
import { Theme } from '../../../components/base/src/theme';

const createStyles = (t: Theme) => {
  return {
    heading: css`
      color: ${t.color.lightSecondary};
      margin-bottom: 20px;

      ${t.mq({
      fontSize: [t.typography.size.big, t.typography.size.huge],
    })};
    `,
  };
};

export default createStyles;
