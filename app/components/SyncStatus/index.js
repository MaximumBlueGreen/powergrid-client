/**
 *
 * SyncStatus
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

const SyncStatusWrapper = styled.p`
  font-size: 0.85em;
  color: grey;
`;

function SyncStatus({ lastSynced, isSyncing }) {
  return (
    <SyncStatusWrapper>
      {isSyncing
        ? 'Syncing...'
        : `Last saved at ${moment(lastSynced).format('H:mm:ss')}`}
    </SyncStatusWrapper>
  );
}

SyncStatus.propTypes = {
  lastSynced: PropTypes.number.isRequired,
  isSyncing: PropTypes.bool.isRequired,
};

export default SyncStatus;
