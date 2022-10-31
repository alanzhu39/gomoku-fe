import { LobbyState, LobbyStatus } from '../Game/Game';

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

export class ServerMessage {
  parse(serverMessage: string) {
    const splitMessage = serverMessage.split('::');
    const serverMessageType = splitMessage[0];
    switch (serverMessageType) {
      case 'LOBBY_JOINED': {
        const lobbyData = splitMessage[1].split(':');
        const lobbyId = lobbyData[0];
        const lobbyStatus = this.getLobbyStatus(lobbyData[1]);
        return new LobbyJoinedMessage(lobbyId, lobbyStatus);
      }
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
