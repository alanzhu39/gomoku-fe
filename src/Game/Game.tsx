import React, { useEffect, useRef, useState } from 'react';
import GameBoard from './GameBoard/GameBoard';
import InfoPanel from './InfoPanel/InfoPanel';
import './Game.css';

export const BOARD_SIZE = 15;

function Game() {
  // TODO: update ws URL
  // const [ws, setWs] = useState(new WebSocket('ws://localhost:8080/connect'));

  // GameBoard state
  // Initialize pieces
  const initPieces: PieceType[][] = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    initPieces[i] = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      initPieces[i][j] = PieceType.EMPTY;
    }
  }
  const [pieces, setPieces] = useState(initPieces);

  // InfoPanel state
  const initMovesList: PlayerMove[] = [];
  const [movesList, setMovesList] = useState(initMovesList);
  const [lobbyState, setLobbyState] = useState(
    new LobbyState(LobbyStatus.LOBBY_EMPTY)
  );

  useEffect(() => {
    // Initialize ws
    // ws.onmessage = (event) => {
    //   // TODO: update necessary state
    // };
  });

  return (
    <div className='Game'>
      Game
      <div className='Game-container'>
        <GameBoard pieces={pieces} onChange={setPieces} />
        <InfoPanel lobbyState={lobbyState} onChange={setLobbyState} />
      </div>
    </div>
  );
}

export enum PieceType {
  EMPTY,
  BLACK,
  WHITE
}

export enum MoveType {
  PIECE,
  RESIGN
}

export class PlayerMove {
  pieceType: PieceType;
  moveType: MoveType;
  coordinate?: [number, number];

  constructor(
    pieceType: PieceType,
    moveType: MoveType,
    coordinate?: [number, number]
  ) {
    this.pieceType = pieceType;
    this.moveType = moveType;
    switch (this.moveType) {
      case MoveType.PIECE: {
        if (!(coordinate == null || coordinate === undefined)) {
          throw new Error('Bad player move');
        }
        this.coordinate = coordinate;
      }
    }
  }
}

export enum LobbyStatus {
  LOBBY_EMPTY,
  ONE_PLAYER_WAITING,
  TWO_PLAYERS_WAITING,
  GAME_STARTED,
  GAME_FINISHED
}

export class LobbyState {
  lobbyStatus: LobbyStatus;

  constructor(lobbyStatus: LobbyStatus) {
    this.lobbyStatus = lobbyStatus;
  }
}

export default Game;
