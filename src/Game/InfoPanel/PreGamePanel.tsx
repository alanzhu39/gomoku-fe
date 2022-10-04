import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, LobbyStatus, PieceType } from '../Game';
import LobbyEmptyPanel from './LobbyEmptyPanel';

function PreGamePanel(props: { lobbyState: LobbyState }) {
  /**
   * Panel displaying pre-game info
   * Includes: create/join lobby, start game flows
   */

  switch (props.lobbyState.lobbyStatus) {
    case LobbyStatus.LOBBY_EMPTY:
      return <LobbyEmptyPanel />;
    case LobbyStatus.ONE_PLAYER_WAITING:
    case LobbyStatus.TWO_PLAYERS_WAITING:
    default:
      return <LobbyEmptyPanel />;
  }
}

export default PreGamePanel;
