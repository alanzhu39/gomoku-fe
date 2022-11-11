import React, { useEffect, useRef, useState } from 'react';
import { PlayerMoveMessage } from '../../../utils/Message';
import { LobbyState, MoveType, PieceType, PlayerMove } from '../../Game';
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
      <button className='InfoPanelButton ResignGameButton' onClick={onResign}>
        Resign
      </button>
    </div>
  );
}

export default GameActionsPanel;
