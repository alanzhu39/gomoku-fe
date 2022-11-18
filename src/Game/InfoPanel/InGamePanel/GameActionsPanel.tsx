import React, { useEffect, useRef, useState } from 'react';
import { PlayerMoveMessage } from '../../../utils/Message';
import { MoveType, PieceType, PlayerMove } from '../../Game';
import LeaveLobbyButton from '../components/LeaveLobbyButton';
import '../InfoPanel.css';

function GameActionsPanel(props: { myPieceType: PieceType; ws: WebSocket }) {
  /**
   * Panel displaying game actions
   */

  function onResign() {
    // Send WS message
    props.ws.send(
      new PlayerMoveMessage(
        new PlayerMove(props.myPieceType, MoveType.RESIGN)
      ).toString()
    );
  }

  return (
    <div className='GameActionsPanel'>
      <div className='ButtonsContainer'>
        <button className='InfoPanelButton ResignGameButton' onClick={onResign}>
          Resign
        </button>
        <LeaveLobbyButton ws={props.ws} />
      </div>
    </div>
  );
}

export default GameActionsPanel;
