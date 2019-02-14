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
/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <Grid
        squares={[
          { number: 1, value: 'A' },
          { number: 2, value: 'B' },
          { number: 3, value: 'C' },
          { number: 12, value: 'A' },
          { number: 22, value: 'B' },
          { number: 32, value: 'C' },
          { number: 13, value: 'A' },
          { number: 23, value: 'B' },
          { number: 33, value: 'C' },
        ]}
      />
    );
  }
}
