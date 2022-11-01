import React from 'react';
import { PlayerMoveMessage } from '../../utils/Message';
import { PieceType, BOARD_SIZE, PlayerMove, MoveType } from '../Game';
import './GameBoard.css';

const GRID_SIZE = 40;

function BoardIntersection(props: {
  pieceType: PieceType;
  ghostPieceType: PieceType;
  row: number;
  col: number;
}) {
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

  let ghostPieceType = 'empty';
  switch (props.ghostPieceType) {
    case PieceType.BLACK:
      ghostPieceType = 'black';
      break;
    case PieceType.WHITE:
      ghostPieceType = 'white';
      break;
  }

  let dataPieceType = 'empty';
  switch (props.pieceType) {
    case PieceType.BLACK:
      dataPieceType = 'black';
      break;
    case PieceType.WHITE:
      dataPieceType = 'white';
      break;
    case PieceType.EMPTY:
      dataPieceType = 'empty';
      break;
  }

  return (
    <div
      className='intersection'
      data-piece-type={dataPieceType}
      data-ghost-piece-type={ghostPieceType}
      data-intersection-type={intersectionTypes.join(' ')}
    />
  );
}

function GameBoard(props: {
  pieces: PieceType[][];
  myPieceType: PieceType;
  ws: WebSocket;
}) {
  /**
   * Representation of Gomoku game board
   * Includes base board, and pieces
   */

  const onPlacePiece = (row: number, col: number) => {
    // Send ws event
    props.ws.send(
      new PlayerMoveMessage(
        new PlayerMove(props.myPieceType, MoveType.PIECE, [row, col])
      ).toString()
    );
  };

  const intersections = [];
  for (let i = 0; i < 15; i++)
    for (let j = 0; j < 15; j++)
      intersections.push(
        <div key={`${i}_${j}`} onClick={() => onPlacePiece(i, j)}>
          {BoardIntersection({
            row: i,
            col: j,
            pieceType: props.pieces[i][j],
            ghostPieceType: props.myPieceType
          })}
        </div>
      );

  const gameBoardStyle = {
    width: (BOARD_SIZE + 1) * GRID_SIZE,
    height: (BOARD_SIZE + 1) * GRID_SIZE
  };

  const boardGridStyle = {
    width: BOARD_SIZE * GRID_SIZE,
    height: BOARD_SIZE * GRID_SIZE,
    '--board-size': BOARD_SIZE
  };

  return (
    <div className='GameBoard' style={gameBoardStyle}>
      <div className='Board-grid' style={boardGridStyle}>
        {intersections}
      </div>
    </div>
  );
}

export default GameBoard;
