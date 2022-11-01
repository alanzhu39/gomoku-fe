import React, { useEffect, useRef, useState } from 'react';
import GameBoard from './GameBoard/GameBoard';
import InfoPanel from './InfoPanel/InfoPanel';
import './Game.css';
import {
  LobbyJoinedMessage,
  LobbyStartedMessage,
  ServerMessage
} from '../utils/Message';

export const BOARD_SIZE = 15;

function Game() {
  // TODO: update ws URL
  const [ws, setWs] = useState(new WebSocket('ws://localhost:8080/connect'));

  // GameBoard state
  // Initialize pieces
  const initPieces: PieceType[][] = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    initPieces[i] = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (i === j) {
        initPieces[i][j] = PieceType.WHITE;
      } else if (i === BOARD_SIZE - j - 1) {
        initPieces[i][j] = PieceType.WHITE;
      } else {
        initPieces[i][j] = PieceType.EMPTY;
      }
    }
  }
  const [pieces, setPieces] = useState(initPieces);

  // InfoPanel state
  // const initMovesList: PlayerMove[] = [
  //   new PlayerMove(PieceType.BLACK, MoveType.PIECE, [0, 0]),
  //   new PlayerMove(PieceType.WHITE, MoveType.PIECE, [1, 1]),
  //   new PlayerMove(PieceType.BLACK, MoveType.PIECE, [3, 5]),
  //   new PlayerMove(PieceType.WHITE, MoveType.PIECE, [12, 0]),
  //   new PlayerMove(PieceType.BLACK, MoveType.PIECE, [15, 15])
  // ];
  const initMovesList: PlayerMove[] = [];
  const [movesList, setMovesList] = useState(initMovesList);
  const [lobbyState, setLobbyState] = useState(
    new LobbyState(LobbyStatus.LOBBY_EMPTY)
  );

  useEffect(() => {
    // Initialize ws
    ws.onmessage = (event) => {
      // TODO: update necessary state
      console.log(event);
      const serverMessage = new ServerMessage().parse(event.data);
      if (
        serverMessage instanceof LobbyJoinedMessage ||
        serverMessage instanceof LobbyStartedMessage
      ) {
        setLobbyState({
          ...lobbyState,
          lobbyStatus: serverMessage.lobbyStatus,
          lobbyId: serverMessage.lobbyId
        });
      }
    };
  });

  return (
    <div className='Game'>
      <GameBoard
        pieces={pieces}
        myPieceType={lobbyState.isCreator ? PieceType.BLACK : PieceType.WHITE}
        ws={ws}
        onChange={setPieces}
      />
      <InfoPanel
        movesList={movesList}
        lobbyState={lobbyState}
        ws={ws}
        setLobbyState={setLobbyState}
      />
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
        if (coordinate == null || coordinate === undefined) {
          throw new Error('Bad player move');
        }
        this.coordinate = coordinate;
      }
    }
  }

  toString() {
    if (this.pieceType === PieceType.EMPTY) return '';
    const charCodeA = 97;
    switch (this.moveType) {
      case MoveType.RESIGN:
        return 'Resigns';
      case MoveType.PIECE:
        if (this.coordinate == null) return '';
        return `${String.fromCharCode(this.coordinate[1] + charCodeA)}${
          this.coordinate[0] + 1
        }`;
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
  isCreator: boolean = true;
  lobbyId?: string;

  constructor(lobbyStatus: LobbyStatus) {
    this.lobbyStatus = lobbyStatus;
  }
}

export default Game;
