import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, LobbyStatus } from '../Game';
import InGamePanel from './InGamePanel';
import PostGamePanel from './PostGamePanel';
import PreGamePanel from './PreGamePanel';

// TODO: onChange typing
function InfoPanel(props: {
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
      infoPanelContents = <InGamePanel />;
      break;
    case LobbyStatus.GAME_FINISHED:
      infoPanelContents = <PostGamePanel />;
  }

  return <div className='InfoPanel'>{infoPanelContents}</div>;
}

export default InfoPanel;
