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
import {
  makeSelectWordListContainerData,
  makeSelectWordListContainer,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadWordList } from './actions';

class WordListContainer extends React.Component {
  componentDidMount() {
    this.props.loadWordList();
  }

  render() {
    const {
      data: entries,
      ui: { entryIds },
    } = this.props;
    return <WordList wordList={entryIds.map(id => entries[id])} />;
  }
}

WordListContainer.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  loadWordList: PropTypes.func.isRequired,
  data: PropTypes.shape({}).isRequired,
  ui: PropTypes.shape({
    entryIds: PropTypes.array.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectWordListContainerData(),
  ui: makeSelectWordListContainer(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadWordList }, dispatch);
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
