import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, PieceType, PlayerMove } from '../../Game';
import '../InfoPanel.css';

function GameActionsPanel(props: { ws: WebSocket }) {
  /**
   * Panel displaying game actions
   */

  return (
    <div className='GameActionsPanel'>
      <button className='InfoPanelButton ResignGameButton'>Resign</button>
    </div>
  );
}

export default GameActionsPanel;
