/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../../global-styles';

const theme = createMuiTheme({
  useNextVariants: true,
});

export default function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/Login" component={LoginPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </ThemeProvider>
      </MuiThemeProvider>
      <GlobalStyle />
    </div>
  );
}
