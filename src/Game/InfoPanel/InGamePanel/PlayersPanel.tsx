import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, PieceType, PlayerMove } from '../../Game';

function PlayersPanel(props: { lobbyState: LobbyState }) {
  /**
   * Panel displaying player info
   */

  return (
    <div className='PlayersPanel'>
      <div className='PlayerCard'>
        <div className='PlayerPiece' data-piece-type={'black'} />
        <span>Player 1{props.lobbyState.isCreator && ' (You)'}</span>
      </div>
      <div className='PlayerCard'>
        <div className='PlayerPiece' data-piece-type={'white'} />
        <span>Player 2{!props.lobbyState.isCreator && ' (You)'}</span>
      </div>
    </div>
  );
}

export default PlayersPanel;
