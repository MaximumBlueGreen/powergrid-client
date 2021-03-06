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
import { reduxForm } from 'redux-form/immutable';

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
import {
  loadWordList,
  updateFilterPattern,
  selectEntry,
  deleteEntry,
  addEntry,
} from './actions';

class WordListContainer extends React.Component {
  componentDidMount() {
    this.props.loadWordList();
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const {
      ui: { loading, moreToLoad },
    } = this.props;

    if (loading || !moreToLoad) {
      return;
    }

    if (
      window.innerHeight + window.pageYOffset >=
      document.body.scrollHeight * 0.9
    ) {
      this.props.loadWordList();
    }
  };

  render() {
    const {
      data: entries,
      ui: { filterPattern, loading, moreToLoad },
      updateFilterPattern,
      updateEntry,
      selectEntry,
      deleteEntry,
      handleSubmit,
      addEntry,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(addEntry)} autoComplete="off">
        <WordList
          wordList={entries}
          filterPattern={filterPattern}
          updateFilterPattern={updateFilterPattern}
          updateEntry={updateEntry}
          selectEntry={selectEntry}
          deleteEntry={deleteEntry}
          loading={loading}
          moreToLoad={moreToLoad}
        />
      </form>
    );
  }
}

WordListContainer.propTypes = {
  loadWordList: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  ui: PropTypes.shape({
    filterPattern: PropTypes.string.isRequired,
    entryIds: PropTypes.array.isRequired,
  }),
  updateFilterPattern: PropTypes.func.isRequired,
  updateEntry: PropTypes.func.isRequired,
  selectEntry: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  addEntry: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectWordListContainerData(),
  ui: makeSelectWordListContainer(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadWordList,
      updateFilterPattern,
      updateEntry,
      selectEntry,
      deleteEntry,
      addEntry,
    },
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
  reduxForm({ form: 'addEntry' }),
  withConnect,
)(WordListContainer);
