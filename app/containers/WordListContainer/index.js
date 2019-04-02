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
import { loadWordList, updateFilterPattern, selectEntry } from './actions';

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
      selectEntry,
    } = this.props;
    return (
      <WordList
        wordList={entries}
        filterPattern={filterPattern}
        updateFilterPattern={updateFilterPattern}
        updateEntry={updateEntry}
        selectEntry={selectEntry}
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
  selectEntry: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectWordListContainerData(),
  ui: makeSelectWordListContainer(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { loadWordList, updateFilterPattern, updateEntry, selectEntry },
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
