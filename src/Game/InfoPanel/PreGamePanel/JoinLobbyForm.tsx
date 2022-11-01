import React, { useState } from 'react';
import { JoinLobbyMessage } from '../../../utils/Message';
import { LobbyState } from '../../Game';
import '../InfoPanel.css';

function JoinLobbyForm(props: {
  lobbyState: LobbyState;
  ws: WebSocket;
  setLobbyState: any;
}) {
  const [lobbyId, setLobbyId] = useState('');

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    setLobbyId(event.currentTarget.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Send WS join lobby message
    props.ws.send(new JoinLobbyMessage(lobbyId).toString());

    // Update creator status
    props.setLobbyState({
      ...props.lobbyState,
      isCreator: false
    });

    event.preventDefault();
  }

  return (
    <form className='JoinLobbyForm' onSubmit={handleSubmit}>
      <label className='LobbyIdLabel'>
        Lobby Id:
        <input
          type='text'
          className='LobbyIdInput'
          value={lobbyId}
          onChange={handleChange}
        />
      </label>
      <button type='submit' className='InfoPanelButton JoinLobbyButton'>
        Join Lobby
      </button>
    </form>
  );
}

export default JoinLobbyForm;
