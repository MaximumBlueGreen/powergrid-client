/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Grid from 'components/Grid';

import { times, noop } from 'lodash';

const blackSquareIndices = [
  49,
  50,
  64,
  65,
  54,
  55,
  69,
  70,
  126,
  127,
  128,
  140,
  144,
  154,
  160,
];
const letters = {
  141: '4',
  142: '0',
  143: '4',
};
const squares = times(225, i => ({
  id: i,
  isBlack: blackSquareIndices.includes(i),
  value: letters[i],
}));

/* eslint-disable react/prefer-stateless-function */
export default class NotFound extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          height: '70vmin',
          width: '70vmin',
        }}
      >
        <Grid
          squares={squares}
          size={{ height: 15, width: 15 }}
          onSquareClicked={noop}
          onKeyPressed={noop}
        />
      </div>
    );
  }
}
