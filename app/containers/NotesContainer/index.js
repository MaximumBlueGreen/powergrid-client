/**
 *
 * NotesContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectWords } from 'containers/CluesContainer/selectors';
import Notes from 'components/Notes';

function NotesContainer({ onEdit, notes, words, onEntryTagClicked }) {
  return (
    <Notes
      onEdit={onEdit}
      notes={notes}
      words={words}
      onEntryTagClicked={onEntryTagClicked}
    />
  );
}

NotesContainer.propTypes = {
  onEdit: PropTypes.func.isRequired,
  notes: PropTypes.string,
  words: PropTypes.object.isRequired,
  onEntryTagClicked: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  words: makeSelectWords(),
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

export default compose(withConnect)(NotesContainer);
