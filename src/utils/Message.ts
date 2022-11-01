import {
  LobbyState,
  LobbyStatus,
  MoveType,
  PieceType,
  PlayerMove
} from '../Game/Game';

export interface ClientMessage {
  toString: () => string;
}

export class CreateLobbyMessage implements ClientMessage {
  toString() {
    return 'CREATE_LOBBY';
  }
}

export class JoinLobbyMessage implements ClientMessage {
  lobbyId: string;

  constructor(lobbyId: string) {
    this.lobbyId = lobbyId;
  }

  toString() {
    return `JOIN_LOBBY::${this.lobbyId}`;
  }
}

export class StartGameMessage implements ClientMessage {
  toString() {
    return 'START_LOBBY';
  }
}

export class PlayerMoveMessage implements ClientMessage {
  playerMove: PlayerMove;

  constructor(playerMove: PlayerMove) {
    this.playerMove = playerMove;
  }

  toString() {
    if (this.playerMove.moveType === MoveType.RESIGN) {
      return 'PLAYER_MOVE::RESIGN';
    } else {
      return `PLAYER_MOVE::PIECE:${this.playerMove.toString()}`;
    }
  }
}

export class ServerMessage {
  parse(serverMessage: string): ServerMessage {
    const splitMessage = serverMessage.split('::');
    const serverMessageType = splitMessage[0];
    switch (serverMessageType) {
      case 'LOBBY_JOINED': {
        const lobbyData = splitMessage[1].split(':');
        const lobbyId = lobbyData[0];
        const lobbyStatus = this.getLobbyStatus(lobbyData[1]);
        return new LobbyJoinedMessage(lobbyId, lobbyStatus);
      }
      case 'LOBBY_STARTED': {
        const lobbyId = splitMessage[1];
        return new LobbyStartedMessage(lobbyId);
      }
      case 'GAME_MOVE': {
        const moveData = splitMessage[1].split(':');
        return new LobbyGameMoveMessage(this.getPlayerMove(moveData));
      }
      default:
        return new ServerMessage();
    }
  }

  getLobbyStatus(lobbyStatus: string): LobbyStatus {
    switch (lobbyStatus) {
      case 'OnePlayerWaiting':
        return LobbyStatus.ONE_PLAYER_WAITING;
      case 'TwoPlayersWaiting':
        return LobbyStatus.TWO_PLAYERS_WAITING;
      case 'GameStarted':
        return LobbyStatus.GAME_STARTED;
      case 'GameFinished':
        return LobbyStatus.GAME_FINISHED;
      default:
        return LobbyStatus.LOBBY_EMPTY;
    }
  }

  getPlayerMove(moveData: string[]): PlayerMove {
    let pieceType = PieceType.EMPTY;
    if (moveData[0] === 'BLACK') {
      pieceType = PieceType.BLACK;
    } else if (moveData[0] === 'WHITE') {
      pieceType = PieceType.WHITE;
    }

    if (moveData[1] === 'RESIGN')
      return new PlayerMove(pieceType, MoveType.RESIGN);
    const charCodeA = 97;
    const col = moveData[1][0];
    const row = moveData[1].slice(1);
    const i = parseInt(row) - 1;
    const j = col.charCodeAt(0) - charCodeA;
    return new PlayerMove(pieceType, MoveType.PIECE, [i, j]);
  }
}

export class LobbyJoinedMessage extends ServerMessage {
  lobbyId: string;
  lobbyStatus: LobbyStatus;

  constructor(lobbyId: string, lobbyStatus: LobbyStatus) {
    super();
    this.lobbyId = lobbyId;
    this.lobbyStatus = lobbyStatus;
  }
}

export class LobbyStartedMessage extends ServerMessage {
  lobbyId: string;
  lobbyStatus: LobbyStatus = LobbyStatus.GAME_STARTED;

  constructor(lobbyId: string) {
    super();
    this.lobbyId = lobbyId;
  }
}

export class LobbyGameMoveMessage extends ServerMessage {
  playerMove: PlayerMove;

  constructor(playerMove: PlayerMove) {
    super();
    this.playerMove = playerMove;
  }
}
