import { css } from '@emotion/core';
import { Theme } from '../../../components/base/src/theme';
import spacingHelper from '../../../style/spacing';

const createStyles = (t: Theme) => {
  return {
    ...spacingHelper(t),

    heading: css`
      color: ${t.color.lightSecondary};
      margin-bottom: 20px;

      ${t.mq({
      fontSize: [t.typography.size.big, t.typography.size.huge],
    })};
    `,
    searchInfo: css`
      font-size: ${t.typography.size.small}px;

      strong {
        font-weight: ${t.typography.weight.regular};
        padding: 0px 4px;
        border-radius: 4px;
        background-color: ${t.color.yellowLight};

        + strong {
          margin-left: ${t.spacing.xxs}px;
        }
      }
    `,
  };
};

export default createStyles;
