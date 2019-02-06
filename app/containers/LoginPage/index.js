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
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import { loginButtonClickedAction } from './actions';

function LoginPage({ loginButtonClickedAction, username }) {
  return (
    <div>
      This is our page! Username <input type="text" />
      <button
        type="button"
        onClick={() => {
          loginButtonClickedAction(username);
        }}
      >
        Login
      </button>
    </div>
  );
}

LoginPage.propTypes = {
  loginButtonClickedAction: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginButtonClickedAction }, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(LoginPage);
