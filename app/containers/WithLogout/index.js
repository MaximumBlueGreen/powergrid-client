/**
 *
 * WithLogout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import injectSaga from 'utils/injectSaga';

import { logout } from './actions';
import saga from './saga';

const withLogout = Component => props => <Component {...props} />;

withLogout.propTypes = {
  logout: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout,
    },
    dispatch,
  );
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'withLogout', saga });

export default compose(
  withSaga,
  withConnect,
  withLogout,
);
