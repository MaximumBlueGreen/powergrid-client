/**
 *
 * LoginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import LoginContainer from 'containers/LoginContainer';
import CreateUserContainer from 'containers/CreateUserContainer';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoginPage = () => (
  <LoginWrapper>
    <LoginContainer />
    <CreateUserContainer />
  </LoginWrapper>
);

LoginPage.propTypes = {};

const withConnect = connect(
  () => ({}),
  () => ({}),
);

export default compose(withConnect)(LoginPage);
