/**
 *
 * CluesContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import ClueList from 'components/ClueList';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectGridContainerWords } from 'containers/GridContainer/selectors';
import makeSelectCluesContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

function CluesContainer({ clues: { across, down } }) {
  return (
    <Grid container justify="space-evenly">
      <Grid
        item
        xs
        component={ClueList}
        clues={Object.keys(across).map(number => ({
          number,
          squares: across[number],
        }))}
      />
      <Grid
        item
        xs
        component={ClueList}
        clues={Object.keys(down).map(number => ({
          number,
          squares: down[number],
        }))}
      />
    </Grid>
  );
}

CluesContainer.propTypes = {
  clues: PropTypes.shape({
    across: PropTypes.object.isRequired,
    down: PropTypes.object.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  cluesContainer: makeSelectCluesContainer(),
  clues: makeSelectGridContainerWords(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'cluesContainer', reducer });
const withSaga = injectSaga({ key: 'cluesContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CluesContainer);
