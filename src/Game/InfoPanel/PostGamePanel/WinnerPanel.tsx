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

  let winnerText = '';
  switch (props.pieceType) {
    case PieceType.WHITE:
      winnerText = 'White wins!';
      break;
    case PieceType.BLACK:
      winnerText = 'Black wins!';
      break;
    case PieceType.EMPTY:
      winnerText = 'Draw!';
      break;
  }

  return (
    <div className='WinnerPanel'>
      {winnerText}
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
