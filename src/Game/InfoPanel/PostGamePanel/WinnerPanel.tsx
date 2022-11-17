import React, { useEffect, useRef, useState } from 'react';
import { RematchMessage } from '../../../utils/Message';
import { PieceType } from '../../Game';
import LeaveLobbyButton from '../components/LeaveLobbyButton';

function WinnerPanel(props: { pieceType: PieceType; ws: WebSocket }) {
  /**
   * Panel displaying winner info
   */

  function onRematch() {
    // Send WS message
    props.ws.send(new RematchMessage().toString());
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
        <LeaveLobbyButton ws={props.ws} />
      </div>
    </div>
  );
}

export default WinnerPanel;
