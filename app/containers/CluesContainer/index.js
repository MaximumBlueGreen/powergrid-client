/**
 *
 * CluesContainer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import ClueList from 'components/ClueList';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCluesContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

function CluesContainer() {
  return (
    <Grid container>
      <Grid item component={ClueList} clues={[]} />
      <Grid item component={ClueList} clues={[]} />
    </Grid>
  );
}

CluesContainer.propTypes = {};

const mapStateToProps = createStructuredSelector({
  cluesContainer: makeSelectCluesContainer(),
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
