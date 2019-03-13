/**
 *
 * LoginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import LoginContainer from 'containers/LoginContainer';
import CreateUserContainer from 'containers/CreateUserContainer';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import { LOGIN_MODE, REGISTRATION_MODE } from './constants';
import makeSelectLoginPage from './selectors';
import { changeMode } from './actions';
import reducer from './reducer';

const LoginWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoginPage = ({ ui: { mode }, changeMode }) => (
  <LoginWrapper>
    {mode === LOGIN_MODE && <LoginContainer />}
    {mode === REGISTRATION_MODE && <CreateUserContainer />}
    <Button color="primary" onClick={changeMode}>
      {mode === LOGIN_MODE ? 'Create account' : 'Login'}
    </Button>
  </LoginWrapper>
);

LoginPage.propTypes = {
  ui: PropTypes.shape({
    mode: PropTypes.string.isRequired,
  }).isRequired,
  changeMode: PropTypes.func.isRequired,
};

const withConnect = connect(
  () =>
    createStructuredSelector({
      ui: makeSelectLoginPage(),
    }),
  dispatch =>
    bindActionCreators(
      {
        changeMode,
      },
      dispatch,
    ),
);

const withReducer = injectReducer({ key: 'loginPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(LoginPage);
