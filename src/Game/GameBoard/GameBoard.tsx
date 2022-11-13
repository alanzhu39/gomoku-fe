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
  isLastPiece: boolean;
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
      data-is-last-piece={props.isLastPiece}
      data-intersection-type={intersectionTypes.join(' ')}
    />
  );
}

function GameBoard(props: {
  movesList: PlayerMove[];
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

  const pieces: PieceType[][] = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    pieces[i] = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      pieces[i][j] = PieceType.EMPTY;
    }
  }

  let lastCoordinate;
  const movesList = props.movesList;
  for (let i = 0; i < movesList.length; i++) {
    const playerMove = movesList[i];
    const coordinate = playerMove.coordinate;
    if (playerMove.moveType === MoveType.PIECE && coordinate !== undefined) {
      pieces[coordinate[0]][coordinate[1]] = playerMove.pieceType;
      lastCoordinate = [coordinate[0], coordinate[1]];
    }
  }

  const intersections = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const isLastPiece =
        lastCoordinate !== undefined &&
        lastCoordinate[0] === i &&
        lastCoordinate[1] === j;
      intersections.push(
        <div key={`${i}_${j}`} onClick={() => onPlacePiece(i, j)}>
          {BoardIntersection({
            row: i,
            col: j,
            pieceType: pieces[i][j],
            ghostPieceType: props.myPieceType,
            isLastPiece
          })}
        </div>
      );
    }
  }

  let labels: JSX.Element[] = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const charCodeA = 97;
    const letterLabel = String.fromCharCode(charCodeA + i);
    const numberLabel = i + 1;
    const indexStyle = {
      width: 'auto',
      height: 'auto',
      '--index': i
    };
    labels = labels.concat([
      <div
        className='BoardLabel'
        key={`t_${i}`}
        data-position='top'
        style={indexStyle}
      >
        {letterLabel}
      </div>,
      <div
        className='BoardLabel'
        key={`l_${i}`}
        data-position='left'
        style={indexStyle}
      >
        {numberLabel}
      </div>,
      <div
        className='BoardLabel'
        key={`r_${i}`}
        data-position='right'
        style={indexStyle}
      >
        {numberLabel}
      </div>,
      <div
        className='BoardLabel'
        key={`b_${i}`}
        data-position='bottom'
        style={indexStyle}
      >
        {letterLabel}
      </div>
    ]);
  }

  const boardGridSize = BOARD_SIZE * GRID_SIZE;
  const boardGridStyle = {
    width: boardGridSize,
    height: boardGridSize,
    '--grid-size': `${GRID_SIZE}px`,
    '--board-size': BOARD_SIZE
  };

  const gameBoardStyle = {
    width: (BOARD_SIZE + 1) * GRID_SIZE,
    height: (BOARD_SIZE + 1) * GRID_SIZE,
    '--label-size': `${GRID_SIZE / 2}px`,
    '--grid-size': `${GRID_SIZE}px`,
    '--board-size': BOARD_SIZE
  };

  return (
    <div className='GameBoard' style={gameBoardStyle}>
      {labels}
      <div className='Board-grid' style={boardGridStyle}>
        {intersections}
      </div>
    </div>
  );
}

export default GameBoard;
