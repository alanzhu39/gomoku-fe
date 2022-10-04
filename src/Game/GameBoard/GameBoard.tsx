import React from 'react';
import { PieceType, BOARD_SIZE } from '../Game';
import './GameBoard.css';

const GRID_SIZE = 40;

function BoardIntersection(props: { row: number; col: number }) {
  const classes = 'intersection';

  const intersectionTypes: string[] = [];
  if (props.row === 0) {
    intersectionTypes.push('top-edge');
  }
  if (props.col === 0) {
    intersectionTypes.push('left-edge');
  }
  if (props.row === BOARD_SIZE - 1) {
    intersectionTypes.push('bottom-edge');
  }
  if (props.col === BOARD_SIZE - 1) {
    intersectionTypes.push('right-edge');
  }

  return (
    <div
      className={classes}
      data-intersection-type={intersectionTypes.join(' ')}
    />
  );
}

function GameBoard(props: { pieces: PieceType[][]; onChange: any }) {
  /**
   * Representation of Gomoku game board
   * Includes base board, and pieces
   */

  const onPlacePiece = () => {
    // TODO: update state via pieces onChange
  };

  const intersections = [];
  for (let i = 0; i < 15; i++)
    for (let j = 0; j < 15; j++)
      intersections.push(
        BoardIntersection({
          row: i,
          col: j
        })
      );

  const style = {
    width: BOARD_SIZE * GRID_SIZE,
    height: BOARD_SIZE * GRID_SIZE,
    '--board-size': BOARD_SIZE
  };

  return (
    <div className='GameBoard'>
      GameBoard
      <div className='Board-grid' style={style}>
        {intersections}
      </div>
    </div>
  );
}

export default GameBoard;
