import React, { useEffect, useRef, useState } from 'react';
import { LobbyState } from '../../Game';
import LeaveLobbyButton from '../components/LeaveLobbyButton';
import '../InfoPanel.css';

function OnePlayerWaitingPanel(props: {
  lobbyState: LobbyState;
  ws: WebSocket;
  setLobbyState: any;
}) {
  /**
   */

  return (
    <div className='OnePlayerWaitingPanel'>
      <span>Lobby Created!</span>
      <span>Waiting for opponent to join...</span>
      <span>Lobby ID: {props.lobbyState.lobbyId}</span>
      <div className='spacer' />
      <LeaveLobbyButton ws={props.ws} />
    </div>
  );
}

export default OnePlayerWaitingPanel;
