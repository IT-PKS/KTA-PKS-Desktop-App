import { css } from '@emotion/core';
import { Theme } from '../../theme';
import loginBackground from '../../resources/loginBackground.png'

const createStyles = (t: Theme) => {
  return {
    text: css`
      color: ${t.color.darkPrimary};
      margin: 0;
      margin-top: 20px;
      margin-bottom: 2px;
      font-family: Open Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 20px;    
    `,
    card_body: css`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap; 
    `,
    title_text: css`
      color: ${t.color.darkNeutral};
      margin-bottom: 6px; 
      padding-left: 8px;
      /* Heading 4 */
      font-family: Open Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 125%;
     `,
    section_content: css`
      margin-bottom: 30px;
     `,
    statement_section: css`
      display: flex;
      flex-direction: column;
      padding: 10px;
    `,
    statement_list: css`
      display: flex;
      flex-direction: row;
      
      p {
        margin-left: 7px;
      }
    `,
    button_section: css`
      display: flex;
      justify-content: center;
    `
  };
};

export default createStyles;