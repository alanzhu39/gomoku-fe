import React, { useEffect, useRef, useState } from 'react';
import { CreateLobbyMessage } from '../../utils/Message';
import { LobbyState, PieceType } from '../Game';
import './InfoPanel.css';
import JoinLobbyForm from './JoinLobbyForm';

function LobbyEmptyPanel(props: { ws: WebSocket; onChange: any }) {
  /**
   * Panel displaying pre-lobby info
   * Includes: create/join lobby flows
   */

  function onCreateLobby() {
    // Send WS message
    props.ws.send(new CreateLobbyMessage().toString());
  }

  return (
    <div className='LobbyEmptyPanel'>
      Start a game!
      <button
        className='InfoPanelButton CreateLobbyButton'
        onClick={onCreateLobby}
      >
        Create Lobby
      </button>
      <hr className='rounded' />
      <JoinLobbyForm ws={props.ws} onChange={props.onChange} />
    </div>
  );
}

export default LobbyEmptyPanel;
