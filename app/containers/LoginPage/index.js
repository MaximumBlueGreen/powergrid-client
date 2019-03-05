/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { TextField, Button } from '@material-ui/core';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import styled from 'styled-components';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import waitForLoginInfo from './saga';
import { loginButtonClickedAction } from './actions';

const FormWrapper = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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
  <FormWrapper onSubmit={handleSubmit(loginButtonClickedAction)}>
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
  </FormWrapper>
);

LoginPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loginButtonClickedAction: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginInfo: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginButtonClickedAction }, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga: waitForLoginInfo });

export default compose(
  withReducer,
  withSaga,
  reduxForm({ form: 'login' }),
  withConnect,
)(LoginPage);
