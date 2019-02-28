/**
 *
 * Grid
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import GridSquare from 'components/GridSquare';
import styled from 'styled-components';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-template-rows: repeat(${props => props.height}, 1fr);
  height: 450px;
  width: 450px;
  font-size: calc(450px / ${props => props.width});
  outline: none;
`;

class Grid extends React.Component {
  componentDidMount() {
    this.gridRef.focus();
  }

  componentDidUpdate() {
    this.gridRef.focus();
  }

  render() {
    const {
      squares,
      size,
      focusedSquareId,
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
  onSquareClicked: PropTypes.func.isRequired,
  onSquareDoubleClicked: PropTypes.func.isRequired,
  onKeyPressed: PropTypes.func.isRequired,
};

export default Grid;
