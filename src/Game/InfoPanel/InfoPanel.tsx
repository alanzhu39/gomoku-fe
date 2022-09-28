import React, { useEffect, useRef, useState } from 'react';
import { LobbyState } from '../Game';

// TODO: onChange typing
function InfoPanel(props: { lobbyState: LobbyState; onChange: any }) {
  /**
   * Panel displaying lobby/game info
   * Can be: PreGamePanel, InGamePanel, PostGamePanel
   * Includes: lobbyState
   */

  return <div className='InfoPanel'>InfoPanel</div>;
}

export default InfoPanel;
