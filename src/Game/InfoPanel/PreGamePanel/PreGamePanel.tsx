import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, LobbyStatus, PieceType } from '../../Game';
import LobbyEmptyPanel from './LobbyEmptyPanel';
import TwoPlayerWaitingPanel from './TwoPlayerWaitingPanel';
import OnePlayerWaitingPanel from './OnePlayerWaitingPanel';

function PreGamePanel(props: {
  lobbyState: LobbyState;
  ws: WebSocket;
  setLobbyState: any;
}) {
  /**
   * Panel displaying pre-game info
   * Includes: create/join lobby, start game flows
   */

  switch (props.lobbyState.lobbyStatus) {
    case LobbyStatus.ONE_PLAYER_WAITING:
      return (
        <OnePlayerWaitingPanel
          lobbyState={props.lobbyState}
          ws={props.ws}
          setLobbyState={props.setLobbyState}
        />
      );
    case LobbyStatus.TWO_PLAYERS_WAITING:
      return (
        <TwoPlayerWaitingPanel
          lobbyState={props.lobbyState}
          ws={props.ws}
          setLobbyState={props.setLobbyState}
        />
      );
    case LobbyStatus.LOBBY_EMPTY:
    default:
      return (
        <LobbyEmptyPanel
          lobbyState={props.lobbyState}
          ws={props.ws}
          setLobbyState={props.setLobbyState}
        />
      );
  }
}

export default PreGamePanel;
