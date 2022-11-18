import React, { useEffect, useRef, useState } from 'react';
import { LeaveLobbyMessage } from '../../../utils/Message';
import '../InfoPanel.css';

function LeaveLobbyButton(props: { ws: WebSocket }) {
  /**
   * Leave lobby button
   */

  function onLeaveLobby() {
    // Send WS message
    props.ws.send(new LeaveLobbyMessage().toString());
  }

  return (
    <button className='InfoPanelButton LeaveLobbyButton' onClick={onLeaveLobby}>
      Leave lobby
    </button>
  );
}

export default LeaveLobbyButton;
