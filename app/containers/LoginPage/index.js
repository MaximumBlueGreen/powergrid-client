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

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import waitForLoginInfo from './saga';
import { loginButtonClickedAction, inputFieldUpdatedAction } from './actions';

function LoginPage({ loginButtonClickedAction, inputFieldUpdatedAction }) {
  return (
    <div>
      This is our page! Username{' '}
      <input
        type="text"
        onChange={e => inputFieldUpdatedAction('username', e.target.value)}
        id="username"
      />
      Password{' '}
      <input
        type="password"
        onChange={e => inputFieldUpdatedAction('password', e.target.value)}
        id="password"
      />
      <button type="button" onClick={loginButtonClickedAction}>
        Login
      </button>
    </div>
  );
}

LoginPage.propTypes = {
  loginButtonClickedAction: PropTypes.func.isRequired,
  inputFieldUpdatedAction: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginInfo: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { loginButtonClickedAction, inputFieldUpdatedAction },
    dispatch,
  );
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
  withConnect,
)(LoginPage);
