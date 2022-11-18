import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, LobbyStatus, PlayerMove } from '../Game';
import InGamePanel from './InGamePanel/InGamePanel';
import PostGamePanel from './PostGamePanel/PostGamePanel';
import PreGamePanel from './PreGamePanel/PreGamePanel';
import './InfoPanel.css';
import LobbyAbandonedPanel from './LobbyAbandonedPanel/LobbyAbandonedPanel';

// TODO: onChange typing
function InfoPanel(props: {
  movesList: PlayerMove[];
  lobbyState: LobbyState;
  ws: WebSocket;
  setLobbyState: any;
}) {
  /**
   * Panel displaying lobby/game info
   * Can be: PreGamePanel, InGamePanel, PostGamePanel
   * Includes: lobbyState
   */

  let infoPanelContents;
  switch (props.lobbyState.lobbyStatus) {
    case LobbyStatus.LOBBY_EMPTY:
    case LobbyStatus.ONE_PLAYER_WAITING:
    case LobbyStatus.TWO_PLAYERS_WAITING:
      infoPanelContents = (
        <PreGamePanel
          lobbyState={props.lobbyState}
          ws={props.ws}
          setLobbyState={props.setLobbyState}
        />
      );
      break;
    case LobbyStatus.GAME_STARTED:
      infoPanelContents = (
        <InGamePanel
          movesList={props.movesList}
          lobbyState={props.lobbyState}
          ws={props.ws}
          setLobbyState={props.setLobbyState}
        />
      );
      break;
    case LobbyStatus.GAME_FINISHED:
      infoPanelContents = (
        <PostGamePanel
          movesList={props.movesList}
          lobbyState={props.lobbyState}
          ws={props.ws}
          setLobbyState={props.setLobbyState}
        />
      );
      break;
    case LobbyStatus.ABANDONED:
      infoPanelContents = (
        <LobbyAbandonedPanel lobbyState={props.lobbyState} ws={props.ws} />
      );
      break;
  }

  return <div className='InfoPanel'>{infoPanelContents}</div>;
}

export default InfoPanel;
