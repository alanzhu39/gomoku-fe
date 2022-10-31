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
      {/* <hr className='rounded' />
      <form className='JoinLobbyForm'>
        <label className='LobbyIdLabel'>
          Lobby Id:
          <input type='text' className='LobbyIdInput' value='value' />
        </label>
        <button type='submit' className='InfoPanelButton JoinLobbyButton'>
          Join Lobby
        </button>
      </form> */}
    </div>
  );
}

export default LobbyEmptyPanel;
