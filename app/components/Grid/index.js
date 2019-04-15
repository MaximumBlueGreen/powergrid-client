/**
 *
 * Grid
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  grid: {
    outline: 'none',
    '&:focus': {
      boxShadow: theme.shadows[2],
    },
  },
});

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: {
        row: undefined,
        col: undefined,
      },
      current: {
        row: undefined,
        col: undefined,
      },
    };
  }

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
      illegalSquareIds,
      highlightedSquareIds,
      setHighlightedSquareIds,
      onHighlightEnd,
      highlightable,
      focus,
      classes,
    } = this.props;

    const { origin, current } = this.state;
    const upperLeftRow = Math.min(origin.row, current.row);
    const upperLeftCol = Math.min(origin.col, current.col);
    const lowerRightRow = Math.max(origin.row, current.row);
    const lowerRightCol = Math.max(origin.col, current.col);

    const temporaryHighlightedSquareIds = squares
      .filter((s, i) => {
        const row = parseInt(i / size.width, 10);
        const col = i % size.width;
        return (
          row >= upperLeftRow &&
          row <= lowerRightRow &&
          col >= upperLeftCol &&
          col <= lowerRightCol
        );
      })
      .map(s => s.id);

    const isHighlighted = id =>
      highlightable &&
      [...highlightedSquareIds, ...temporaryHighlightedSquareIds].includes(id);

    const isIllegal = id => illegalSquareIds.includes(id);

    const squareColor = ({ id, isBlack }) => {
      if (id === focusedSquareId) {
        return isBlack ? 'gray' : 'yellow';
      }
      if (isIllegal(id)) {
        return 'red';
      }

      if (focusedWordSquareIds.includes(id)) {
        return 'lightblue';
      }

      if (isBlack) {
        return 'black';
      }

      return isHighlighted(id) ? '#dddddd' : 'white';
    };

    return (
      <svg
        className={classes.grid}
        viewBox={`0 0 ${size.width} ${size.height}`}
        xmlns="http://www.w3.org/2000/svg"
        onKeyDown={onKeyPressed}
        {...(focus ? { tabIndex: 0 } : {})}
        ref={c => {
          this.gridRef = c;
        }}
        onMouseLeave={() => {
          this.setState({
            origin: { row: undefined, col: undefined },
            current: { row: undefined, col: undefined },
          });
        }}
      >
        {squares.map((s, i) => {
          const row = parseInt(i / size.width, 10);
          const col = i % size.width;

          return (
            <React.Fragment key={s.id}>
              <rect
                key={s.id}
                x={i % size.width}
                y={parseInt(i / size.width, 10)}
                width="1"
                height="1"
                stroke={s.isBlack ? 'black' : '#aaaaaa'}
                strokeWidth=".02"
                fill={squareColor(s)}
                fillOpacity={isHighlighted(s.id) ? 0.75 : 1}
                onClick={e => onSquareClicked(e, s.id)}
                onMouseDown={({ metaKey }) => {
                  this.setState({
                    origin: { row, col },
                    current: { row, col },
                  });
                  if (!metaKey) {
                    setHighlightedSquareIds([]);
                  }
                }}
                onMouseUp={() => {
                  this.setState({
                    origin: { row: undefined, col: undefined },
                    current: { row: undefined, col: undefined },
                  });
                  if (
                    upperLeftRow !== lowerRightRow ||
                    upperLeftCol !== lowerRightCol
                  ) {
                    onHighlightEnd(temporaryHighlightedSquareIds);
                  }
                }}
                onMouseEnter={() => {
                  this.setState({
                    current: {
                      row,
                      col,
                    },
                  });
                }}
              />
              {s.value && (
                <text
                  x={(i % size.width) + 0.5}
                  y={parseInt(i / size.width, 10) + 0.65}
                  fontSize=".7"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  pointerEvents="none"
                  style={{ userSelect: 'none' }}
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
                  style={{ userSelect: 'none' }}
                >
                  {s.number}
                </text>
              )}
            </React.Fragment>
          );
        })}
        <rect
          x={0}
          y={0}
          width={size.width}
          height={size.height}
          stroke="#aaaaaa"
          strokeWidth=".04"
          fill="none"
        />
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
  onSquareClicked: PropTypes.func,
  onKeyPressed: PropTypes.func,
  focus: PropTypes.bool,
  highlightedSquareIds: PropTypes.arrayOf(PropTypes.string),
  setHighlightedSquareIds: PropTypes.func,
  illegalSquareIds: PropTypes.array,
  onHighlightEnd: PropTypes.func,
  highlightable: PropTypes.bool,
  classes: PropTypes.shape({
    grid: PropTypes.string.isRequired,
  }).isRequired,
};

Grid.defaultProps = {
  focusedWordSquareIds: [],
  focus: true,
  onSquareClicked: noop,
  onKeyPressed: noop,
  onHighlightEnd: noop,
  setHighlightedSquareIds: noop,
  highlightedSquareIds: [],
  illegalSquareIds: [],
  highlightable: true,
};

export default withStyles(styles)(Grid);
