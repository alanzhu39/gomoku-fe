import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, PieceType } from '../Game';
import './InfoPanel.css';

function LobbyEmptyPanel() {
  /**
   * Panel displaying pre-lobby info
   * Includes: create/join lobby flows
   */

  return (
    <div className='LobbyEmptyPanel'>
      Start a game!
      <button className='InfoPanelButton CreateLobbyButton'>
        Create Lobby
      </button>
      <button className='InfoPanelButton JoinLobbyButton'>Join Lobby</button>
    </div>
  );
}

export default LobbyEmptyPanel;
