/**
 *
 * AddEntry
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable';
// import { TextField, Button } from '@material-ui/core';

// import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import styled from 'styled-components';
import saga from './saga';
import { addEntry } from './actions';

const AddEntryContainer = ({ handleSubmit, addEntry }) => (
  <form onSubmit={handleSubmit(addEntry)}>
    <input type="text" name="entry" />
    <button type="submit">Add</button>
  </form>
);

AddEntryContainer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  addEntry: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addEntry }, dispatch);
}

const withConnect = connect(
  () => ({}),
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'addEntryContainer', saga });

export default compose(
  withSaga,
  reduxForm({ form: 'addEntry' }),
  withConnect,
)(AddEntryContainer);
