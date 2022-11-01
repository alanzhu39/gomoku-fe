import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, PieceType, PlayerMove } from '../../Game';
import PlayersPanel from './PlayersPanel';

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

  return (
    <div className='InGamePanel'>
      <PlayersPanel lobbyState={props.lobbyState} />
    </div>
  );
}

export default InGamePanel;
