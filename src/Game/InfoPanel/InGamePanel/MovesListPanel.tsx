import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, MoveType, PieceType, PlayerMove } from '../../Game';

function MovesListPanel(props: { movesList: PlayerMove[] }) {
  /**
   * Panel displaying in-game moves list
   */

  const movesList = props.movesList;

  const pieceMoves = movesList.filter(
    (playerMove) => playerMove.moveType === MoveType.PIECE
  );
  const playerResigned =
    movesList.length > 0 &&
    movesList[movesList.length - 1].moveType === MoveType.RESIGN;

  let resigningPlayer = '';
  if (playerResigned) {
    const lastMove = movesList[movesList.length - 1];
    if (lastMove.pieceType === PieceType.BLACK) resigningPlayer = 'Black';
    else if (lastMove.pieceType === PieceType.WHITE) resigningPlayer = 'White';
  }

  return (
    <div className='MovesListPanel'>
      <div className='MovesListGrid'>
        {pieceMoves.map((playerMove, index) => {
          return (
            <div className='PlayerMoveCard' key={index}>
              {playerMove.toString()}
            </div>
          );
        })}
        {pieceMoves.length % 2 === 1 && <div className='PlayerMoveCard' />}
        {playerResigned && (
          <div className='PlayerMoveCard PlayerResignCard'>
            {resigningPlayer} resigns!
          </div>
        )}
      </div>
    </div>
  );
}

export default MovesListPanel;
