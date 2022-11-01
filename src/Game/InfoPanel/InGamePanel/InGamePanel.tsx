import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, PieceType, PlayerMove } from '../../Game';

function InGamePanel(props: {
  movesList: PlayerMove[];
  lobbyState: LobbyState;
  ws: WebSocket;
  setLobbyState: any;
}) {
  /**
   * Panel displaying in-game info
   * Includes: MovesList, buttons for game actions (resign, etc.)
   */

  return <div className='InGamePanel'>{/* TODO */}</div>;
}

export default InGamePanel;
