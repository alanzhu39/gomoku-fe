import React, { useState } from 'react';
import './InfoPanel.css';

function JoinLobbyForm(props: { ws: WebSocket; onChange: any }) {
  const [lobbyId, setLobbyId] = useState('');

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    setLobbyId(event.currentTarget.value);
  }

  function handleSubmit() {
    // TODO
    // Send WS join lobby message
  }

  return (
    <form className='JoinLobbyForm'>
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
