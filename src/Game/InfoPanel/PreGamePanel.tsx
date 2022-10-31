import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, LobbyStatus, PieceType } from '../Game';
import LobbyEmptyPanel from './LobbyEmptyPanel';
import LobbyWaitingPanel from './LobbyWaitingPanel';

function PreGamePanel(props: {
  lobbyState: LobbyState;
  ws: WebSocket;
  onChange: any;
}) {
  /**
   * Panel displaying pre-game info
   * Includes: create/join lobby, start game flows
   */

  switch (props.lobbyState.lobbyStatus) {
    case LobbyStatus.LOBBY_EMPTY:
      return <LobbyEmptyPanel ws={props.ws} onChange={props.onChange} />;
    case LobbyStatus.ONE_PLAYER_WAITING:
    case LobbyStatus.TWO_PLAYERS_WAITING:
      return (
        <LobbyWaitingPanel
          lobbyState={props.lobbyState}
          ws={props.ws}
          onChange={props.onChange}
        />
      );
    default:
      return <LobbyEmptyPanel ws={props.ws} onChange={props.onChange} />;
  }
}

export default PreGamePanel;
