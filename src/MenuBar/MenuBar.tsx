import React from 'react';
import './MenuBar.css';

function MenuBar(props: { panes: any; setPanes: any }) {
  const githubUrl = 'https://github.com/alanzhu39/gomoku-fe';

  function goHome() {
    // Clear local storage
    window.localStorage.removeItem('MOVES_LIST');
    window.localStorage.removeItem('LOBBY_STATE');

    // Redirect
    const siteUrl = process.env.REACT_APP_SITE_URL!;
    window.location.href = siteUrl;
  }

  function openAboutPane() {
    props.setPanes({ aboutPane: true });
  }

  function openInstructionsPane() {
    props.setPanes({ instructionsPane: true });
  }

  return (
    <div className='MenuBar'>
      <div className='MenuBarItem' onClick={goHome}>
        PlayGomoku.net
      </div>
      <div className='spacer'></div>
      <div className='MenuBarItem' onClick={openAboutPane}>
        About
      </div>
      <div className='MenuBarItem' onClick={openInstructionsPane}>
        How to play
      </div>
      <div className='MenuBarItem'>
        <a href={githubUrl} target='_blank' rel='noopener noreferrer'>
          <img
            src={require('../assets/GitHub-Logo.png')}
            className='GitHubLogo'
          />
        </a>
      </div>
    </div>
  );
}

export default MenuBar;
