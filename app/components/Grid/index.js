/**
 *
 * Grid
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import GridSquare from 'components/GridSquare';
import styled from 'styled-components';

/* TODO: handle non-square grids */
const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-auto-rows: 1fr;

  font-size: calc(40vmax / ${props => props.width});
  outline: none;

  max-width: 70vh;

  &:before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`;

class Grid extends React.Component {
  componentDidMount() {
    this.gridRef.focus();
  }

  render() {
    const {
      squares,
      size,
      focusedSquareId,
      focusedWordSquareIds,
      onSquareClicked,
      onSquareDoubleClicked,
      onKeyPressed,
    } = this.props;

    return (
      <StyledGrid
        {...size}
        onKeyDown={onKeyPressed}
        tabIndex={0}
        ref={c => {
          this.gridRef = c;
        }}
      >
        {squares.map((s, i) => (
          <GridSquare
            key={s.id}
            {...s}
            isFocused={focusedSquareId === s.id}
            isPartOfFocusedWord={focusedWordSquareIds.includes(s.id)}
            onClick={() => onSquareClicked(i)}
            onDoubleClick={() => onSquareDoubleClicked(s.id)}
          />
        ))}
      </StyledGrid>
    );
  }
}

Grid.propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  squares: PropTypes.arrayOf(PropTypes.object).isRequired,
  focusedSquareId: PropTypes.string.isRequired,
  focusedWordSquareIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSquareClicked: PropTypes.func.isRequired,
  onSquareDoubleClicked: PropTypes.func.isRequired,
  onKeyPressed: PropTypes.func.isRequired,
};

export default Grid;
