/**
 *
 * GridActionBar
 *
 */

import React from 'react';

import { Chip, Grid, IconButton, Tooltip } from '@material-ui/core';
import {
  Undo as UndoIcon,
  Redo as RedoIcon,
  Clear as ClearSquaresIcon,
  Stop as BlackSquareModeIcon,
  TextFormat as FillModeIcon,
  CompareArrows as DiagonalSymmetryModeIcon,
  NotInterested as NoneSymmetryModeIcon,
} from '@material-ui/icons';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import {
  CLICK_MODE_FILL,
  CLICK_MODE_BLACK_SQUARE,
} from 'containers/GridContainer/constants';

import {
  SYMMETRY_MODE_NONE,
  SYMMETRY_MODE_DIAGONAL,
} from 'entities/Puzzles/constants';

import PropTypes from 'prop-types';

function GridActionBar({
  undo,
  redo,
  clearSquares,
  clickMode,
  toggleClickMode,
  symmetryMode,
  setSymmetryMode,
  canUndo,
  canRedo,
  wordCount,
  blackSquareCount,
}) {
  return (
    <Grid container alignItems="center" spacing={8}>
      <Grid item>
        <Tooltip title="Undo" placement="top">
          <IconButton color="primary" onClick={undo} disabled={!canUndo}>
            <UndoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Redo" placement="top">
          <IconButton color="primary" onClick={redo} disabled={!canRedo}>
            <RedoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Clear Grid" placement="top">
          <IconButton color="primary" onClick={clearSquares}>
            <ClearSquaresIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          exclusive
          value={clickMode}
          onChange={toggleClickMode}
        >
          <Tooltip title="Fill mode" placement="top" value={CLICK_MODE_FILL}>
            <ToggleButton>
              <FillModeIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
          <Tooltip
            title="Black Square mode 【 . 】"
            placement="top"
            value={CLICK_MODE_BLACK_SQUARE}
          >
            <ToggleButton>
              <BlackSquareModeIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          exclusive
          value={symmetryMode}
          onChange={(e, value) => setSymmetryMode(value)}
        >
          <Tooltip
            title="No symmetry"
            placement="top"
            value={SYMMETRY_MODE_NONE}
          >
            <ToggleButton>
              <NoneSymmetryModeIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
          <Tooltip
            title="Diagonal Symmetry"
            placement="top"
            value={SYMMETRY_MODE_DIAGONAL}
          >
            <ToggleButton>
              <DiagonalSymmetryModeIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <Chip label={`${wordCount} words`} variant="outlined" />
        <Chip label={`${blackSquareCount} blocks`} variant="outlined" />
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
  symmetryMode: PropTypes.string.isRequired,
  setSymmetryMode: PropTypes.func.isRequired,
  canRedo: PropTypes.bool.isRequired,
  canUndo: PropTypes.bool.isRequired,
  wordCount: PropTypes.number.isRequired,
  blackSquareCount: PropTypes.number.isRequired,
};

export default GridActionBar;
