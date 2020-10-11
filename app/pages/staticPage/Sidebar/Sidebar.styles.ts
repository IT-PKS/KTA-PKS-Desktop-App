import { css } from '@emotion/core';
import { Theme } from '../../../components/base/src/theme';

const createStyles = (t: Theme) => {
  return {
    sidebar_menus: css`
      padding: 10px;
      position: absolute;
      box-shadow: 6px 0px 10px rgba(0, 0, 0, 0.05);
      width: 208px;
      background-color: ${t.color.lightPrimary};
      top: 92px;
      left: 0px;
      bottom: 0;
      margin: 0;
      transition: all 0.5s;
    `,
    sidebar_menus__close: css`
      width: 50px;
      padding: 0px;
    }`,
    sidebar_menus__responsive: css`
      @media screen and (min-width: 320px) and (max-width: 999px) {
        width: 50px;
        padding: 0px;
    }`,
    sidebar_minimize__responsive: css`
      @media screen and (min-width: 320px) and (max-width: 999px) {
        display: none;
    }`,
    menu: css`
      height: 42px;
      display: flex;
      align-items: center;
      padding-left: 18px;
      color: ${t.color.yellowLight};
      cursor: pointer;
      border-left: 5px solid ${t.color.lightPrimary};

      &:hover {
        div{
          color: ${(t.color.darkPrimary)};
        }
        color: ${t.color.yellowDark};
        border-left: 5px solid ${t.color.redPrimary};
        background-color: ${t.color.gray}
      }
      &.active{
        div{
          color: ${(t.color.darkPrimary)};
        }
        color: ${t.color.yellowDark};
        border-left: 5px solid ${t.color.redPrimary};
        background-color: ${t.color.gray}
      }
      div {
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        margin-left: 18px;
        margin-top: 11px;
        color: rgba(0, 0, 0, 0.5);
      }
    `,
    menu__close: css`
      padding-left: 5px;
      div{
        position: relative;
        display: none;
        border-radius:4px;
        top: -5px;
        p {
          width: 110px;
          padding: 5px;
          height:12px;
          padding-bottom: 0;
        }
      }
      &:hover {
        div {
          display: inline;
          box-shadow: 6px 0px 10px rgba(0, 0, 0, 0.05);
          color: ${(t.color.darkPrimary)};
          background-color: ${t.color.lightPrimary}
        }
        color: ${t.color.yellowDark};
        border-left: 5px solid ${t.color.redPrimary};
        background-color: ${t.color.lightPrimary}
      }
    `,
    menu__responsive: css`
      @media screen and (min-width: 320px) and (max-width: 999px) {
        padding-left: 5px;
        div{
          position: relative;
          display: none;
          border-radius:4px;
          top: -5px;
          p {
            width: 110px;
            padding: 5px;
            height: 12px;
            padding-bottom: 0;
          }
        }
        &:hover {
          div {
            display: inline;
            box-shadow: 6px 0px 10px rgba(0, 0, 0, 0.05);
            color: ${(t.color.darkPrimary)};
            background-color: ${t.color.lightPrimary}
          }
          color: ${t.color.yellowDark};
          border-left: 5px solid ${t.color.redPrimary};
          background-color: ${t.color.lightPrimary}
        }
      }
    `,
    icon_chevron_left: css`
      color: ${t.color.darkNeutral};
    `,
    sidebar_minimize: css`
      position:absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FFFFFF;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      top: calc(100% - 50%);
      left: 190px;
      cursor: pointer; 
      transition: all 0.5s;
      &:hover {
        background-color: ${t.color.yellowDark};
        svg {
          color:  ${t.color.lightPrimary};
        }
      }
    `,
    sidebar_minimize__close: css`
      left: 35px; 
    `
  };
};

export default createStyles;
