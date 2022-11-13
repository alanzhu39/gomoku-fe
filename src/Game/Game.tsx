import React, { useEffect, useRef, useState } from 'react';
import GameBoard from './GameBoard/GameBoard';
import InfoPanel from './InfoPanel/InfoPanel';
import './Game.css';
import {
  LobbyGameMoveMessage,
  LobbyStatusMessage,
  ServerMessage,
  SessionTokenMessage
} from '../utils/Message';

export const BOARD_SIZE = 15;

function Game() {
  // Initial state
  // TODO: update ws URL
  const [ws, setWs] = useState(() => {
    const sessionToken = window.localStorage.getItem('SESSION_TOKEN');
    if (sessionToken !== null) {
      return new WebSocket(`ws://localhost:8080/connect?${sessionToken}`);
    } else {
      return new WebSocket('ws://localhost:8080/connect?');
    }
  });

  const initPieces: PieceType[][] = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    initPieces[i] = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      initPieces[i][j] = PieceType.EMPTY;
    }
  }
  const [pieces, setPieces] = useState(() => {
    const piecesState = window.localStorage.getItem('PIECES');
    if (piecesState !== null) return JSON.parse(piecesState);
    else return initPieces;
  });
  useEffect(() => {
    window.localStorage.setItem('PIECES', JSON.stringify(pieces));
  }, [pieces]);

  const initMovesList: PlayerMove[] = [];
  const [movesList, setMovesList] = useState(() => {
    const movesListState = window.localStorage.getItem('MOVES_LIST');
    if (movesListState !== null) return JSON.parse(movesListState);
    else return initMovesList;
  });
  useEffect(() => {
    window.localStorage.setItem('MOVES_LIST', JSON.stringify(movesList));
  }, [movesList]);

  const [lobbyState, setLobbyState] = useState(() => {
    const lobbyStorageState = window.localStorage.getItem('LOBBY_STATE');
    if (lobbyStorageState !== null) return JSON.parse(lobbyStorageState);
    else return new LobbyState(LobbyStatus.LOBBY_EMPTY);
  });
  useEffect(() => {
    window.localStorage.setItem('LOBBY_STATE', JSON.stringify(lobbyState));
  }, [lobbyState]);

  useEffect(() => {
    // Initialize ws
    ws.onmessage = (event) => {
      // TODO: logging
      console.log(event);
      const serverMessage = new ServerMessage().parse(event.data);
      if (serverMessage instanceof SessionTokenMessage) {
        window.localStorage.setItem(
          'SESSION_TOKEN',
          serverMessage.sessionToken
        );
      } else if (serverMessage instanceof LobbyStatusMessage) {
        if (
          lobbyState.lobbyStatus === LobbyStatus.GAME_FINISHED &&
          serverMessage.lobbyStatus === LobbyStatus.GAME_STARTED
        ) {
          // Reset game on rematch
          setMovesList(initMovesList);
          setPieces(initPieces);
          setLobbyState({
            ...lobbyState,
            lobbyStatus: serverMessage.lobbyStatus,
            lobbyId: serverMessage.lobbyId,
            myPieceType: getOppositePieceType(lobbyState.myPieceType)
          });
        } else if (serverMessage.lobbyStatus === LobbyStatus.CLOSED) {
          setMovesList(initMovesList);
          setPieces(initPieces);
          setLobbyState(new LobbyState(LobbyStatus.LOBBY_EMPTY));
        } else {
          setLobbyState({
            ...lobbyState,
            lobbyStatus: serverMessage.lobbyStatus,
            lobbyId: serverMessage.lobbyId
          });
        }
      } else if (serverMessage instanceof LobbyGameMoveMessage) {
        const playerMove = serverMessage.playerMove;
        setMovesList([...movesList, playerMove]);
        if (
          playerMove.moveType === MoveType.PIECE &&
          playerMove.coordinate !== null &&
          playerMove.coordinate !== undefined
        ) {
          const newPieces = [];
          for (let i = 0; i < pieces.length; i++) {
            newPieces[i] = pieces[i].slice();
          }
          newPieces[playerMove.coordinate[0]][playerMove.coordinate[1]] =
            playerMove.pieceType;
          setPieces(newPieces);
        }
      }
    };
  });

  return (
    <div className='Game'>
      <GameBoard pieces={pieces} myPieceType={lobbyState.myPieceType} ws={ws} />
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

export function getOppositePieceType(pieceType: PieceType) {
  switch (pieceType) {
    case PieceType.BLACK:
      return PieceType.WHITE;
    case PieceType.WHITE:
      return PieceType.BLACK;
    default:
      return PieceType.EMPTY;
  }
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
  GAME_FINISHED,
  CLOSED
}

export class LobbyState {
  lobbyStatus: LobbyStatus;
  isCreator: boolean = true;
  myPieceType: PieceType = PieceType.BLACK;
  lobbyId?: string;

  constructor(lobbyStatus: LobbyStatus) {
    this.lobbyStatus = lobbyStatus;
  }
}

export default Game;
