import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, PieceType, PlayerMove } from '../../Game';
import GameActionsPanel from './GameActionsPanel';
import MovesListPanel from './MovesListPanel';
import PlayersPanel from './PlayersPanel';
import '../InfoPanel.css';

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
      <MovesListPanel movesList={props.movesList} />
      <div className='spacer' />
      <GameActionsPanel ws={props.ws} />
    </div>
  );
}

export default InGamePanel;
