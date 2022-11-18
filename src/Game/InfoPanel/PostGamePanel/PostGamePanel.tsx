import React, { useEffect, useRef, useState } from 'react';
import {
  BOARD_SIZE,
  getOppositePieceType,
  LobbyState,
  MoveType,
  PieceType,
  PlayerMove
} from '../../Game';
import MovesListPanel from '../InGamePanel/MovesListPanel';
import PlayersPanel from '../InGamePanel/PlayersPanel';
import WinnerPanel from './WinnerPanel';

function PostGamePanel(props: {
  movesList: PlayerMove[];
  lobbyState: LobbyState;
  ws: WebSocket;
  setLobbyState: any;
}) {
  /**
   * Panel displaying post-game info
   * Includes: game result, buttons (exit lobby, rematch, etc.)
   */

  const MAX_MOVES = BOARD_SIZE * BOARD_SIZE;

  let winnerPieceType = PieceType.EMPTY;
  const movesList = props.movesList;
  if (movesList.length > 0) {
    const lastMove = movesList[movesList.length - 1];
    if (lastMove.moveType === MoveType.RESIGN) {
      winnerPieceType = getOppositePieceType(lastMove.pieceType);
    } else if (movesList.length < MAX_MOVES) {
      winnerPieceType = lastMove.pieceType;
    } else {
      // Draw
    }
  }

  return (
    <div className='PostGamePanel'>
      <PlayersPanel lobbyState={props.lobbyState} />
      <MovesListPanel movesList={props.movesList} />
      <div className='spacer' />
      <WinnerPanel pieceType={winnerPieceType} ws={props.ws} />
    </div>
  );
}

export default PostGamePanel;
