export interface ClientMessage {
  toString: () => string;
}

export class CreateLobbyMessage implements ClientMessage {
  toString() {
    return 'CREATE_LOBBY';
  }
}
