import React, { useEffect, useRef, useState } from 'react';
import { LobbyState } from '../../Game';
import LeaveLobbyButton from '../components/LeaveLobbyButton';
import '../InfoPanel.css';

function OnePlayerWaitingPanel(props: {
  lobbyState: LobbyState;
  ws: WebSocket;
  setLobbyState: any;
}) {
  /**
   */

  const [copied, setCopied] = useState(false);
  const siteUrl = process.env.REACT_APP_SITE_URL!;
  const linkText =
    props.lobbyState.lobbyId !== undefined
      ? `${siteUrl}/?lobbyId=${props.lobbyState.lobbyId}`
      : undefined;

  function copyToClipboard() {
    if (linkText !== undefined) {
      // Copy to clipboard
      void navigator.clipboard.writeText(linkText);

      // Show copied text
      setCopied(true);

      // Close after delay
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }

  return (
    <div className='OnePlayerWaitingPanel'>
      <span>Lobby Created!</span>
      <span>Waiting for opponent to join...</span>
      <span>Lobby ID: {props.lobbyState.lobbyId}</span>
      {linkText !== undefined && (
        <div>
          <span style={{ fontSize: '16px' }}>
            Share the link below to invite a friend to your lobby!
          </span>
          <div className='CopyLinkContainer'>
            <input
              className='InviteLinkInput'
              type='text'
              readOnly={true}
              value={linkText}
            />
            <button
              className='CopyLinkButton'
              title='Copy to clipboard'
              type='button'
              onClick={copyToClipboard}
            >
              <img
                className='ClipboardIcon'
                src={require('../../../assets/clipboard-icon.png')}
              />
            </button>
          </div>
          <div
            style={{
              opacity: copied ? 1 : 0,
              fontSize: '12px',
              transitionProperty: 'opacity',
              transitionDuration: '0.5s',
              pointerEvents: 'none',
              marginTop: '10px'
            }}
          >
            Link copied to clipboard!
          </div>
        </div>
      )}
      <div className='spacer' />
      <LeaveLobbyButton ws={props.ws} />
    </div>
  );
}

export default OnePlayerWaitingPanel;
