import { assert } from 'console';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function Game() {
  // TODO: update ws URL
  const [ws, setWs] = useState(new WebSocket('ws://localhost:8080/connect'));

  // GameBoard state
  const [pieces, setPieces] = useState([[PieceType.EMPTY]]);

  // InfoPanel state
  const initMovesList: PlayerMove[] = [];
  const [movesList, setMovesList] = useState(initMovesList);
  const [lobbyState, setLobbyState] = useState(
    new LobbyState(LobbyStatus.LOBBY_EMPTY)
  );

  useEffect(() => {
    // Initialize ws
    ws.onmessage = (event) => {
      // TODO: update necessary state
    };

    // Initialize pieces
    const BOARD_SIZE = 15;
    const initPieces: number[][] = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      initPieces[i] = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        initPieces[i][j] = PieceType.EMPTY;
      }
    }
    setPieces(initPieces);
  });

  return <div className='Game'>{/* TODO */}</div>;
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
        assert(!(coordinate == null || coordinate === undefined));
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
