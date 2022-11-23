import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, PieceType, PlayerMove } from '../../Game';

function PlayersPanel(props: { lobbyState: LobbyState }) {
  /**
   * Panel displaying player info
   */

  const myPieceType = props.lobbyState.myPieceType;
  const isBlack = myPieceType === PieceType.BLACK;
  const isWhite = myPieceType === PieceType.WHITE;

  const currentTurn = props.lobbyState.currentTurn;

  return (
    <div className='PlayersPanel'>
      <div className='PlayerCard'>
        <div
          className='PlayerPiece'
          data-piece-type={'black'}
          data-is-current={currentTurn === PieceType.BLACK}
        />
        <span>Player 1{isBlack && ' (You)'}</span>
      </div>
      <div className='PlayerCard'>
        <div
          className='PlayerPiece'
          data-piece-type={'white'}
          data-is-current={currentTurn === PieceType.WHITE}
        />
        <span>Player 2{isWhite && ' (You)'}</span>
      </div>
    </div>
  );
}

export default PlayersPanel;
