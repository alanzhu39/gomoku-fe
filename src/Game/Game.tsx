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
import { plainToInstance } from 'class-transformer';

export const BOARD_SIZE = 15;
const wsUrl = process.env.REACT_APP_WS_URL!;

function Game() {
  // Initial state
  // TODO: update ws URL
  const [ws, setWs] = useState(() => {
    const sessionToken = window.localStorage.getItem('SESSION_TOKEN');
    if (sessionToken !== null) {
      return new WebSocket(`${wsUrl}/connect?${sessionToken}`);
    } else {
      return new WebSocket(`${wsUrl}/connect`);
    }
  });

  const initMovesList: PlayerMove[] = [];
  const [movesList, setMovesList] = useState(() => {
    const movesListState = window.localStorage.getItem('MOVES_LIST');
    if (movesListState !== null)
      return plainToInstance(
        PlayerMove,
        JSON.parse(movesListState) as Object[]
      );
    else return initMovesList;
  });
  useEffect(() => {
    window.localStorage.setItem('MOVES_LIST', JSON.stringify(movesList));
  }, [movesList]);

  const [lobbyState, setLobbyState] = useState(() => {
    const lobbyStorageState = window.localStorage.getItem('LOBBY_STATE');
    if (lobbyStorageState !== null)
      return plainToInstance(
        LobbyState,
        JSON.parse(lobbyStorageState) as Object
      );
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
          setLobbyState({
            ...lobbyState,
            lobbyStatus: serverMessage.lobbyStatus,
            lobbyId: serverMessage.lobbyId,
            myPieceType: getOppositePieceType(lobbyState.myPieceType)
          });
        } else if (serverMessage.lobbyStatus === LobbyStatus.CLOSED) {
          setMovesList(initMovesList);
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
        setLobbyState({
          ...lobbyState,
          currentTurn: getOppositePieceType(playerMove.pieceType)
        });
      }
    };
  });

  return (
    <div className='Game'>
      <div className='GameContainer'>
        <GameBoard
          movesList={movesList}
          myPieceType={lobbyState.myPieceType}
          ws={ws}
        />
        <InfoPanel
          movesList={movesList}
          lobbyState={lobbyState}
          ws={ws}
          setLobbyState={setLobbyState}
        />
      </div>
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
  ABANDONED,
  CLOSED
}

export class LobbyState {
  lobbyStatus: LobbyStatus;
  isCreator: boolean = true;
  myPieceType: PieceType = PieceType.BLACK;
  currentTurn: PieceType = PieceType.BLACK;
  lobbyId?: string;

  constructor(lobbyStatus: LobbyStatus) {
    this.lobbyStatus = lobbyStatus;
  }
}

export default Game;
