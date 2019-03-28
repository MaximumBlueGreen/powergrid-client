/**
 *
 * DictionaryContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Button, TextField } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form/immutable';
import styled from 'styled-components';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';

import ResultBoxList from 'components/ResultBoxList';
import { makeSelectDictionaryContainerData } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { searchButtonClicked } from './actions';

const SearchButtonWrapper = styled.div`
  padding-top: 20px;
`;

const renderTextField = ({ input, label, ...custom }) => (
  <TextField label={label} {...input} {...custom} />
);

const isRequired = value =>
  value || typeof value === 'number' ? undefined : 'Required';

const DictionaryContainer = ({
  data: resultList,
  searchButtonClicked,
  handleSubmit,
  invalid,
  submitting,
}) => (
  <div>
    <form onSubmit={handleSubmit(searchButtonClicked)} id="0">
      <div>
        <div>
          <Field
            name="query"
            label="Query"
            component={renderTextField}
            validate={isRequired}
          />
        </div>
      </div>
      <SearchButtonWrapper>
        <Button
          type="submit"
          disabled={invalid || submitting}
          variant="contained"
          color="primary"
          fullWidth
        >
          Search
        </Button>
      </SearchButtonWrapper>
    </form>
    <ResultBoxList resultList={resultList} />
  </div>
);

DictionaryContainer.propTypes = {
  data: PropTypes.array.isRequired,
  searchButtonClicked: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectDictionaryContainerData(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchButtonClicked }, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dictionaryContainer', reducer });
const withSaga = injectSaga({ key: 'dictionaryContainer', saga });

export default compose(
  withSaga,
  withReducer,
  reduxForm({ form: 'dictionary' }),
  withConnect,
)(DictionaryContainer);
