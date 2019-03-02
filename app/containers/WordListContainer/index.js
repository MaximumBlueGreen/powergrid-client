/**
 *
 * WordListContainer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import WordList from 'components/WordList';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectWordListContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

function WordListContainer() {
  return (
    <WordList
      wordList={[
        { word: 'POWERGRID', score: 10 },
        { word: 'MING', score: 20 },
        { word: 'CHOW', score: 30 },
      ]}
    />
  );
}

WordListContainer.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  wordlistContainer: makeSelectWordListContainer(),
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
)(WordListContainer);
