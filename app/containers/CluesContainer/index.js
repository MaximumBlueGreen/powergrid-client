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
import { selectClue } from './actions';
import makeSelectCluesContainer, {
  makeSelectClues,
  makeSelectWords,
  makeSelectCompletion,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

function CluesContainer({
  puzzleId,
  words: { across: acrossWords, down: downWords },
  clues: { across: acrossClues, down: downClues },
  updateClue,
  selectClue,
  completion: {
    across: { completed: completedAcross, total: totalAcross },
    down: { completed: completedDown, total: totalDown },
  },
}) {
  return (
    <Grid container>
      <Grid item xs={6}>
        <ClueList
          clues={acrossClues}
          words={acrossWords}
          header={`Across: ${completedAcross} / ${totalAcross} done`}
          updateClue={(number, text) =>
            updateClue(puzzleId, number, true, text)
          }
          onFocused={number => selectClue(puzzleId, number, true)}
        />
      </Grid>
      <Grid item xs={6}>
        <ClueList
          clues={downClues}
          words={downWords}
          header={`Down: ${completedDown} / ${totalDown} done`}
          updateClue={(number, text) =>
            updateClue(puzzleId, number, false, text)
          }
          onFocused={number => selectClue(puzzleId, number, false)}
        />
      </Grid>
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
  selectClue: PropTypes.func.isRequired,
  completion: PropTypes.shape({
    across: PropTypes.shape({
      completed: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    }),
    down: PropTypes.shape({
      completed: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  cluesContainer: makeSelectCluesContainer(),
  words: makeSelectWords(),
  clues: createStructuredSelector({
    across: makeSelectClues('across'),
    down: makeSelectClues('down'),
  }),
  completion: createStructuredSelector({
    across: makeSelectCompletion('across'),
    down: makeSelectCompletion('down'),
  }),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateClue,
      selectClue,
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
