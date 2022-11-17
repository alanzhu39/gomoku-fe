import React, { useEffect, useRef, useState } from 'react';
import { StartGameMessage } from '../../../utils/Message';
import { LobbyState } from '../../Game';
import LeaveLobbyButton from '../components/LeaveLobbyButton';
import '../InfoPanel.css';

function TwoPlayerWaitingPanel(props: {
  lobbyState: LobbyState;
  ws: WebSocket;
  setLobbyState: any;
}) {
  /**
   * Panel displayed for two players waiting lobby
   * Lobby creator is shown a button to start the game
   */

  function startGame() {
    // Send ws message
    props.ws.send(new StartGameMessage().toString());
  }

  return (
    <div className='TwoPlayerWaitingPanel'>
      <span>Lobby Ready!</span>
      <span>Lobby ID: {props.lobbyState.lobbyId}</span>
      {props.lobbyState.isCreator && (
        <button className='InfoPanelButton StartGameButton' onClick={startGame}>
          Start Game
        </button>
      )}
      {!props.lobbyState.isCreator &&
        'Waiting for lobby creator to start game...'}
      <div className='spacer' />
      <LeaveLobbyButton ws={props.ws} />
    </div>
  );
}

export default TwoPlayerWaitingPanel;
