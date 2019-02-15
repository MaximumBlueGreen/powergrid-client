/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Grid from 'components/Grid';

import _ from 'lodash';
/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <Grid
        squares={_.times(30, n => ({ number: n, value: 'A' }))}
        size={{ height: 6, width: 5 }}
      />
    );
  }
}
