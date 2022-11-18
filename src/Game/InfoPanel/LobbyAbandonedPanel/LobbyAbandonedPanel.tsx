import React, { useEffect, useRef, useState } from 'react';
import { LobbyState } from '../../Game';
import LeaveLobbyButton from '../components/LeaveLobbyButton';
import '../InfoPanel.css';

function LobbyAbandonedPanel(props: { lobbyState: LobbyState; ws: WebSocket }) {
  /**
   * Displayed when opponent leaves lobby
   */

  return (
    <div className='LobbyAbandonedPanel'>
      <span>Opponent has left the lobby!</span>
      <span>Lobby ID: {props.lobbyState.lobbyId}</span>
      <div className='spacer' />
      <LeaveLobbyButton ws={props.ws} />
    </div>
  );
}

export default LobbyAbandonedPanel;
