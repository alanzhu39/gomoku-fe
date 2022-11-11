import React, { useEffect, useRef, useState } from 'react';
import { PieceType } from '../../Game';

function WinnerPanel(props: { pieceType: PieceType }) {
  /**
   * Panel displaying winner info
   */

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
        <button className='InfoPanelButton RematchButton'>Rematch</button>
        <button className='InfoPanelButton LeaveLobbyButton'>
          Leave lobby
        </button>
      </div>
    </div>
  );
}

export default WinnerPanel;
