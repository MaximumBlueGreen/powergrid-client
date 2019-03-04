/**
 *
 * SyncStatus
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import styled from 'styled-components';

function SyncStatus({ lastSynced, isSyncing }) {
  return isSyncing ? (
    <p>Syncing...</p>
  ) : (
    <p>Last saved at {moment(lastSynced).format('H:mm:ss')}</p>
  );
}

SyncStatus.propTypes = {
  lastSynced: PropTypes.number.isRequired,
  isSyncing: PropTypes.bool.isRequired,
};

export default SyncStatus;
