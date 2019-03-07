/**
 *
 * WordListContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import WordList from 'components/WordList';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { updateEntry } from 'entities/Entries/actions';
import {
  makeSelectWordListContainerData,
  makeSelectWordListContainer,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadWordList, updateFilterPattern } from './actions';

class WordListContainer extends React.Component {
  componentDidMount() {
    this.props.loadWordList();
  }

  render() {
    const {
      data: entries,
      ui: { filterPattern },
      updateFilterPattern,
      updateEntry,
    } = this.props;
    return (
      <WordList
        wordList={entries}
        filterPattern={filterPattern}
        updateFilterPattern={updateFilterPattern}
        updateEntry={updateEntry}
      />
    );
  }
}

WordListContainer.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  loadWordList: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  ui: PropTypes.shape({
    filterPattern: PropTypes.string.isRequired,
    entryIds: PropTypes.array.isRequired,
  }),
  updateFilterPattern: PropTypes.func.isRequired,
  updateEntry: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectWordListContainerData(),
  ui: makeSelectWordListContainer(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { loadWordList, updateFilterPattern, updateEntry },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'wordListContainer', reducer });
const withSaga = injectSaga({ key: 'wordListContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WordListContainer);
