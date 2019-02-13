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
import { loginButtonClickedAction } from './actions';

function LoginPage({ loginButtonClickedAction }) {
  return (
    <div>
      This is our page! Username <input type="text" id="username" />
      Password <input type="text" id="password" />
      <button
        type="button"
        onClick={() => {
          loginButtonClickedAction(
            document.getElementById('username').value,
            document.getElementById('password').value,
          );
        }}
      >
        Login
      </button>
    </div>
  );
}

LoginPage.propTypes = {
  loginButtonClickedAction: PropTypes.func.isRequired,
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
  withConnect,
)(LoginPage);
