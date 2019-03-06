/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { TextField, Button } from '@material-ui/core';

// import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import styled from 'styled-components';
import saga from './saga';
import { loginButtonClickedAction } from './actions';

const SubmitButtonWrapper = styled.div`
  padding-top: 20px;
`;

const renderTextField = ({ input, label, ...custom }) => (
  <TextField label={label} {...input} {...custom} />
);

const isRequired = value =>
  value || typeof value === 'number' ? undefined : 'Required';
const isEmailValid = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

const LoginPage = ({
  handleSubmit,
  loginButtonClickedAction,
  invalid,
  submitting,
}) => (
  <form onSubmit={handleSubmit(loginButtonClickedAction)} id="0">
    <div>
      <div>
        <Field
          name="email"
          label="Email"
          component={renderTextField}
          type="email"
          placeholder="xwords@power.grid"
          validate={[isEmailValid, isRequired]}
        />
      </div>
    </div>
    <div>
      <div>
        <Field
          name="password"
          label="Password"
          component={renderTextField}
          type="password"
          validate={isRequired}
        />
      </div>
    </div>
    <SubmitButtonWrapper>
      <Button
        type="submit"
        disabled={invalid || submitting}
        variant="contained"
        color="primary"
        fullWidth
      >
        Login
      </Button>
    </SubmitButtonWrapper>
  </form>
);

LoginPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loginButtonClickedAction: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginButtonClickedAction }, dispatch);
}

const withConnect = connect(
  () => ({}),
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'loginContainer', saga });

export default compose(
  withSaga,
  reduxForm({ form: 'login' }),
  withConnect,
)(LoginPage);
