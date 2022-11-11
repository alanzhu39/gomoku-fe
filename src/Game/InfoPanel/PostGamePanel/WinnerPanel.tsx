import React, { useEffect, useRef, useState } from 'react';
import { LeaveLobbyMessage, RematchMessage } from '../../../utils/Message';
import { PieceType } from '../../Game';

function WinnerPanel(props: { pieceType: PieceType; ws: WebSocket }) {
  /**
   * Panel displaying winner info
   */

  function onRematch() {
    // Send WS message
    props.ws.send(new RematchMessage().toString());
  }

  function onLeaveLobby() {
    // Send WS message
    props.ws.send(new LeaveLobbyMessage().toString());
  }

  let winner = '';
  switch (props.pieceType) {
    case PieceType.WHITE:
      winner = 'White';
      break;
    case PieceType.BLACK:
      winner = 'Black';
      break;
  }

  return (
    <div className='WinnerPanel'>
      {winner} wins!
      <div className='ButtonsContainer'>
        <button className='InfoPanelButton RematchButton' onClick={onRematch}>
          Rematch
        </button>
        <button
          className='InfoPanelButton LeaveLobbyButton'
          onClick={onLeaveLobby}
        >
          Leave lobby
        </button>
      </div>
    </div>
  );
}

export default WinnerPanel;
