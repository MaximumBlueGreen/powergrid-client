/**
 *
 * CluesContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import Grid from '@material-ui/core/Grid';
import ClueList from 'components/ClueList';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { updateClue } from 'entities/Clues/actions';
import makeSelectCluesContainer, {
  makeSelectClues,
  makeSelectWords,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

function CluesContainer({
  puzzleId,
  words: { across: acrossWords, down: downWords },
  clues: { across: acrossClues, down: downClues },
  updateClue,
}) {
  return (
    <Grid container justify="space-evenly">
      <Grid
        item
        xs
        component={ClueList}
        clues={acrossClues}
        words={acrossWords}
        header="Across"
        updateClue={(number, text) => updateClue(puzzleId, number, true, text)}
      />
      <Grid
        item
        xs
        component={ClueList}
        clues={downClues}
        words={downWords}
        header="Down"
        updateClue={(number, text) => updateClue(puzzleId, number, false, text)}
      />
    </Grid>
  );
}

CluesContainer.propTypes = {
  puzzleId: PropTypes.string.isRequired,
  clues: PropTypes.shape({
    across: PropTypes.object.isRequired,
    down: PropTypes.object.isRequired,
  }).isRequired,
  words: PropTypes.shape({
    across: PropTypes.object.isRequired,
    down: PropTypes.object.isRequired,
  }).isRequired,
  updateClue: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cluesContainer: makeSelectCluesContainer(),
  words: makeSelectWords(),
  clues: createStructuredSelector({
    across: makeSelectClues('across'),
    down: makeSelectClues('down'),
  }),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateClue,
    },
    dispatch,
  );
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
