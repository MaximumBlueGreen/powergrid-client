/**
 *
 * GridActionBar
 *
 */

import React from 'react';

import { Grid, IconButton, Tooltip } from '@material-ui/core';
import {
  Undo as UndoIcon,
  Redo as RedoIcon,
  Clear as ClearIcon,
  Stop as StopIcon,
  TextFormat as TextFormatIcon,
} from '@material-ui/icons';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import {
  CLICK_MODE_FILL,
  CLICK_MODE_BLACK_SQUARE,
} from 'containers/GridContainer/constants';
import PropTypes from 'prop-types';

function GridActionBar({
  undo,
  redo,
  clearSquares,
  clickMode,
  toggleClickMode,
}) {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <Tooltip title="Undo" placement="top">
          <IconButton color="primary">
            <UndoIcon onClick={undo} fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Redo" placement="top">
          <IconButton color="primary">
            <RedoIcon onClick={redo} fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Clear Grid" placement="top">
          <IconButton color="primary">
            <ClearIcon fontSize="small" onClick={clearSquares} />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          exclusive
          value={clickMode}
          onChange={toggleClickMode}
        >
          <Tooltip
            title="Black Square mode"
            placement="top"
            value={CLICK_MODE_BLACK_SQUARE}
          >
            <ToggleButton>
              <StopIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Fill mode" placement="top" value={CLICK_MODE_FILL}>
            <ToggleButton>
              <TextFormatIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}

GridActionBar.propTypes = {
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
  toggleClickMode: PropTypes.func.isRequired,
  clearSquares: PropTypes.func.isRequired,
  clickMode: PropTypes.string.isRequired,
};

export default GridActionBar;
