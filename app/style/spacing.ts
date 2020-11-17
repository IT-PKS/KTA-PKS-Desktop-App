import { css } from '@emotion/core';
import { Theme } from 'components/base';

const spacingHelper = (t: Theme) => {
  return {
    // Margin top
    mtxxs: css`
      margin-top: ${t.spacing.xxs}px;
    `,
    mtxs: css`
      margin-top: ${t.spacing.xs}px;
    `,
    mts: css`
      margin-top: ${t.spacing.s}px;
    `,
    mtm: css`
      margin-top: ${t.spacing.m}px;
    `,
    mtml: css`
      margin-top: ${t.spacing.ml}px;
    `,
    mtl: css`
      margin-top: ${t.spacing.l}px;
    `,
    mtxl: css`
      margin-top: ${t.spacing.xl}px;
    `,
    mtxxl: css`
      margin-top: ${t.spacing.xxl}px;
    `,
    mtxxxl: css`
      margin-top: ${t.spacing.xxxl}px;
    `,
    mtxxxxl: css`
      margin-top: ${t.spacing.xxxxl}px;
    `,

    // Margin right
    mrxxs: css`
      margin-right: ${t.spacing.xxs}px;
    `,
    mrxs: css`
      margin-right: ${t.spacing.xs}px;
    `,
    mrs: css`
      margin-right: ${t.spacing.s}px;
    `,
    mrm: css`
      margin-right: ${t.spacing.m}px;
    `,
    mrml: css`
      margin-right: ${t.spacing.ml}px;
    `,
    mrl: css`
      margin-right: ${t.spacing.l}px;
    `,
    mrxl: css`
      margin-right: ${t.spacing.xl}px;
    `,
    mrxxl: css`
      margin-right: ${t.spacing.xxl}px;
    `,
    mrxxxl: css`
      margin-right: ${t.spacing.xxxl}px;
    `,
    mrxxxxl: css`
      margin-right: ${t.spacing.xxxxl}px;
    `,

    // Margin bottom
    mbxxs: css`
      margin-bottom: ${t.spacing.xxs}px;
    `,
    mbxs: css`
      margin-bottom: ${t.spacing.xs}px;
    `,
    mbs: css`
      margin-bottom: ${t.spacing.s}px;
    `,
    mbm: css`
      margin-bottom: ${t.spacing.m}px;
    `,
    mbml: css`
      margin-bottom: ${t.spacing.ml}px;
    `,
    mbl: css`
      margin-bottom: ${t.spacing.l}px;
    `,
    mbxl: css`
      margin-bottom: ${t.spacing.xl}px;
    `,
    mbxxl: css`
      margin-bottom: ${t.spacing.xxl}px;
    `,
    mbxxxl: css`
      margin-bottom: ${t.spacing.xxxl}px;
    `,
    mbxxxxl: css`
      margin-bottom: ${t.spacing.xxxxl}px;
    `,

    // Margin left
    mlxxs: css`
      margin-left: ${t.spacing.xxs}px;
    `,
    mlxs: css`
      margin-left: ${t.spacing.xs}px;
    `,
    mls: css`
      margin-left: ${t.spacing.s}px;
    `,
    mlm: css`
      margin-left: ${t.spacing.m}px;
    `,
    mlml: css`
      margin-left: ${t.spacing.ml}px;
    `,
    mll: css`
      margin-left: ${t.spacing.l}px;
    `,
    mlxl: css`
      margin-left: ${t.spacing.xl}px;
    `,
    mlxxl: css`
      margin-left: ${t.spacing.xxl}px;
    `,
    mlxxxl: css`
      margin-left: ${t.spacing.xxxl}px;
    `,
    mlxxxxl: css`
      margin-left: ${t.spacing.xxxxl}px;
    `,

    // Padding top
    ptxxs: css`
      padding-top: ${t.spacing.xxs}px;
    `,
    ptxs: css`
      padding-top: ${t.spacing.xs}px;
    `,
    pts: css`
      padding-top: ${t.spacing.s}px;
    `,
    ptm: css`
      padding-top: ${t.spacing.m}px;
    `,
    ptml: css`
      padding-top: ${t.spacing.ml}px;
    `,
    ptl: css`
      padding-top: ${t.spacing.l}px;
    `,
    ptxl: css`
      padding-top: ${t.spacing.xl}px;
    `,
    ptxxl: css`
      padding-top: ${t.spacing.xxl}px;
    `,
    ptxxxl: css`
      padding-top: ${t.spacing.xxxl}px;
    `,
    ptxxxxl: css`
      padding-top: ${t.spacing.xxxxl}px;
    `,

    // Padding right
    prxxs: css`
      padding-right: ${t.spacing.xxs}px;
    `,
    prxs: css`
      padding-right: ${t.spacing.xs}px;
    `,
    prs: css`
      padding-right: ${t.spacing.s}px;
    `,
    prm: css`
      padding-right: ${t.spacing.m}px;
    `,
    prml: css`
      padding-right: ${t.spacing.ml}px;
    `,
    prl: css`
      padding-right: ${t.spacing.l}px;
    `,
    prxl: css`
      padding-right: ${t.spacing.xl}px;
    `,
    prxxl: css`
      padding-right: ${t.spacing.xxl}px;
    `,
    prxxxl: css`
      padding-right: ${t.spacing.xxxl}px;
    `,
    prxxxxl: css`
      padding-right: ${t.spacing.xxxxl}px;
    `,

    // Padding bottom
    pbxxs: css`
      padding-bottom: ${t.spacing.xxs}px;
    `,
    pbxs: css`
      padding-bottom: ${t.spacing.xs}px;
    `,
    pbs: css`
      padding-bottom: ${t.spacing.s}px;
    `,
    pbm: css`
      padding-bottom: ${t.spacing.m}px;
    `,
    pbml: css`
      padding-bottom: ${t.spacing.ml}px;
    `,
    pbl: css`
      padding-bottom: ${t.spacing.l}px;
    `,
    pbxl: css`
      padding-bottom: ${t.spacing.xl}px;
    `,
    pbxxl: css`
      padding-bottom: ${t.spacing.xxl}px;
    `,
    pbxxxl: css`
      padding-bottom: ${t.spacing.xxxl}px;
    `,
    pbxxxxl: css`
      padding-bottom: ${t.spacing.xxxxl}px;
    `,

    // Padding left
    plxxs: css`
      padding-left: ${t.spacing.xxs}px;
    `,
    plxs: css`
      padding-left: ${t.spacing.xs}px;
    `,
    pls: css`
      padding-left: ${t.spacing.s}px;
    `,
    plm: css`
      padding-left: ${t.spacing.m}px;
    `,
    plml: css`
      padding-left: ${t.spacing.ml}px;
    `,
    pll: css`
      padding-left: ${t.spacing.l}px;
    `,
    plxl: css`
      padding-left: ${t.spacing.xl}px;
    `,
    plxxl: css`
      padding-left: ${t.spacing.xxl}px;
    `,
    plxxxl: css`
      padding-left: ${t.spacing.xxxl}px;
    `,
    plxxxxl: css`
      padding-left: ${t.spacing.xxxxl}px;
    `,
  };
};

export default spacingHelper;
