import React, { useEffect, useRef, useState } from 'react';
import { LobbyState } from '../Game';
import './InfoPanel.css';

function TwoPlayerWaitingPanel(props: {
  lobbyState: LobbyState;
  ws: WebSocket;
  setLobbyState: any;
}) {
  /**
   */

  return (
    <div className='TwoPlayerWaitingPanel'>
      <span>Lobby Ready!</span>
      <span>Lobby ID: {props.lobbyState.lobbyId}</span>
      {props.lobbyState.isCreator && <button>Start Game</button>}
    </div>
  );
}

export default TwoPlayerWaitingPanel;
