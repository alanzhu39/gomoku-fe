import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, PieceType, PlayerMove } from '../../Game';

function PlayersPanel(props: { lobbyState: LobbyState }) {
  /**
   * Panel displaying player info
   */

  const myPieceType = props.lobbyState.myPieceType;
  const isBlack = myPieceType === PieceType.BLACK;
  const isWhite = myPieceType === PieceType.WHITE;

  return (
    <div className='PlayersPanel'>
      <div className='PlayerCard'>
        <div className='PlayerPiece' data-piece-type={'black'} />
        <span>Player 1{isBlack && ' (You)'}</span>
      </div>
      <div className='PlayerCard'>
        <div className='PlayerPiece' data-piece-type={'white'} />
        <span>Player 2{isWhite && ' (You)'}</span>
      </div>
    </div>
  );
}

export default PlayersPanel;
