import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { PieceType } from './Game';

function GameBoard(props: { pieces: PieceType[][] }) {
  /**
   * Representation of Gomoku game board
   * Includes base board, and pieces
   */

  const onPlacePiece = () => {
    // TODO: update state via pieces onChange
  };

  return <div className='GameBoard'>{/* TODO */}</div>;
}

export default GameBoard;
