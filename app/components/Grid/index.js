/**
 *
 * Grid
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

class Grid extends React.Component {
  componentDidMount() {
    if (this.props.focus) {
      this.gridRef.focus();
    }
  }

  render() {
    const {
      squares,
      size,
      focusedSquareId,
      focusedWordSquareIds,
      onSquareClicked,
      onKeyPressed,
    } = this.props;

    const squareColor = ({ id, isBlack }) => {
      if (id === focusedSquareId) {
        return isBlack ? 'gray' : 'yellow';
      }
      if (focusedWordSquareIds.includes(id)) {
        return 'lightblue';
      }
      return isBlack ? 'black' : 'white';
    };

    return (
      <svg
        viewBox={`0 0 ${size.width} ${size.height}`}
        xmlns="http://www.w3.org/2000/svg"
        onKeyDown={onKeyPressed}
        tabIndex={0}
        ref={c => {
          this.gridRef = c;
        }}
      >
        {squares.map((s, i) => (
          <>
            <rect
              x={i % size.width}
              y={parseInt(i / size.width, 10)}
              width="1"
              height="1"
              stroke="#aaaaaa"
              strokeWidth=".02"
              fill={squareColor(s)}
              onClick={() => onSquareClicked(s.id)}
            />
            {s.value && (
              <text
                x={(i % size.width) + 0.5}
                y={parseInt(i / size.width, 10) + 0.65}
                fontSize=".7"
                dominantBaseline="middle"
                textAnchor="middle"
                pointerEvents="none"
              >
                {s.value.toUpperCase()}
              </text>
            )}
            {s.number && (
              <text
                x={(i % size.width) + 0.04}
                y={parseInt(i / size.width, 10) + 0.25}
                fontSize=".25"
                pointerEvents="none"
              >
                {s.number}
              </text>
            )}
          </>
        ))}
      </svg>
    );
  }
}

Grid.propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  squares: PropTypes.arrayOf(PropTypes.object).isRequired,
  focusedSquareId: PropTypes.string,
  focusedWordSquareIds: PropTypes.arrayOf(PropTypes.string),
  onSquareClicked: PropTypes.func.isRequired,
  onKeyPressed: PropTypes.func.isRequired,
  focus: PropTypes.bool,
};

Grid.defaultProps = {
  focusedWordSquareIds: [],
  focus: true,
};

export default Grid;
