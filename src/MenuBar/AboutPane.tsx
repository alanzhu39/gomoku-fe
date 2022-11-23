import React from 'react';
import SlidingPane from 'react-sliding-pane';
import './MenuBar.css';
import MenuSlidingPane from './MenuSlidingPane';

function AboutPane(props: { isOpen: boolean; onRequestClose: any }) {
  return (
    <MenuSlidingPane
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
    >
      <div className='AboutPane'>
        <h2>About</h2>
        <span>
          PlayGomoku.net provides a simple interface for playing the board game
          Gomoku with your friends! Visit the {'"How to play"'} section to learn
          more about the rules of the game.
        </span>
        <h3>User Interface</h3>
        <span></span>
      </div>
    </MenuSlidingPane>
  );
}

export default AboutPane;
