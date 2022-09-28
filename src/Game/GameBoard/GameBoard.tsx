import React, { useEffect, useRef, useState } from 'react';
import Board from './Board';
import { PieceType } from '../Game';

function GameBoard(props: { pieces: PieceType[][]; onChange: any }) {
  /**
   * Representation of Gomoku game board
   * Includes base board, and pieces
   */

  const onPlacePiece = () => {
    // TODO: update state via pieces onChange
  };

  return (
    <div className='GameBoard'>
      GameBoard
      <Board />
    </div>
  );
}

export default GameBoard;
