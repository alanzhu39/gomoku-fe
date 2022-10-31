import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, LobbyStatus } from '../Game';
import InGamePanel from './InGamePanel';
import PostGamePanel from './PostGamePanel';
import PreGamePanel from './PreGamePanel';

// TODO: onChange typing
function InfoPanel(props: {
  lobbyState: LobbyState;
  ws: WebSocket;
  onChange: any;
}) {
  /**
   * Panel displaying lobby/game info
   * Can be: PreGamePanel, InGamePanel, PostGamePanel
   * Includes: lobbyState
   */

  switch (props.lobbyState.lobbyStatus) {
    case LobbyStatus.LOBBY_EMPTY:
    case LobbyStatus.ONE_PLAYER_WAITING:
    case LobbyStatus.TWO_PLAYERS_WAITING:
      return (
        <PreGamePanel
          lobbyState={props.lobbyState}
          ws={props.ws}
          onChange={props.onChange}
        />
      );
    case LobbyStatus.GAME_STARTED:
      return <InGamePanel />;
    case LobbyStatus.GAME_FINISHED:
      return <PostGamePanel />;
  }
}

export default InfoPanel;
