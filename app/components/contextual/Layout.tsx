import React from 'react';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { theme, globalStyles } from 'components/base';

const Layout: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles(theme)} />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
