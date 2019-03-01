/**
 *
 * WordlistContainer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectWordlistContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

function WordlistContainer() {
  return <div />;
}

WordlistContainer.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  wordlistContainer: makeSelectWordlistContainer(),
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

const withReducer = injectReducer({ key: 'wordlistContainer', reducer });
const withSaga = injectSaga({ key: 'wordlistContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WordlistContainer);
