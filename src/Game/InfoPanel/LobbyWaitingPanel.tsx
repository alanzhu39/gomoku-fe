import React, { useEffect, useRef, useState } from 'react';
import { LobbyState } from '../Game';
import './InfoPanel.css';

function LobbyWaitingPanel(props: {
  lobbyState: LobbyState;
  ws: WebSocket;
  onChange: any;
}) {
  /**
   */

  return <div className='LobbyWaitingPanel'></div>;
}

export default LobbyWaitingPanel;
