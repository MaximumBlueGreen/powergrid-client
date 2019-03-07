/**
 *
 * SyncStatus
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

function SyncStatus({ lastSynced, isSyncing }) {
  return (
    <Typography variant="caption" gutterBottom>
      {isSyncing
        ? 'Syncing...'
        : `Last saved at ${moment(lastSynced).format('h:mm:ss a')}`}
    </Typography>
  );
}

SyncStatus.propTypes = {
  lastSynced: PropTypes.number.isRequired,
  isSyncing: PropTypes.bool.isRequired,
};

export default SyncStatus;
