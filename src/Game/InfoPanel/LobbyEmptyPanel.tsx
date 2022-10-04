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
      LobbyEmptyPanel
      {/* Create lobby button */}
      {/* Join lobby button */}
    </div>
  );
}

export default LobbyEmptyPanel;
