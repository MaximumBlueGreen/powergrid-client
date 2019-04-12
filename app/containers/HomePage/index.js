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

import PuzzleContainer from 'containers/PuzzleContainer';
import NavDrawer from 'components/NavDrawer';
import PropTypes from 'prop-types';
/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <PuzzleContainer puzzleId={match.params.puzzleId} />
        <NavDrawer />
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      puzzleId: PropTypes.string,
    }),
  }),
};
