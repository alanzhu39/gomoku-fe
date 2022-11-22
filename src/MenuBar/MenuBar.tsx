import React from 'react';
import './MenuBar.css';

function MenuBar() {
  return (
    <div className='MenuBar'>
      <div className='MenuBarItem noHover'>PlayGomoku.net</div>
      <div className='spacer'></div>
      <div className='MenuBarItem'>About</div>
      <div className='MenuBarItem'>How to play</div>
      <div className='MenuBarItem'>
        <img
          src={require('../assets/GitHub-Logo.png')}
          className='GitHubLogo'
        />
      </div>
    </div>
  );
}

export default MenuBar;
