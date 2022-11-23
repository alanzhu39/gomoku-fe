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
        <p>
          PlayGomoku.net provides a simple interface for playing the board game
          Gomoku with your friends! Visit the {'"How to play"'} section to learn
          more about the rules of the game.
        </p>
        <h3>User Interface</h3>
        <p>
          To start a game of Gomoku, click the {'"Create Lobby"'} button on the
          home screen. Then, share the lobby ID with a friend to join.
        </p>
        <img
          src={require('../assets/in-game-screenshot.png')}
          style={{ width: '700px', height: 'auto', marginInline: 'auto' }}
        />
        <p>
          Once the game is started, the side panel will show relevant
          information about the game, including which color pieces you are
          playing with, the moves played so far in the game, and buttons for
          interacting with the lobby. The last piece placed will also be
          highlighted in red on the game board.
        </p>
        <p>
          After the game, you can choose to rematch your opponent or leave the
          lobby to start a new game.
        </p>
        <h3>Credits</h3>
        <p>
          PlayGomoku.net is developed and maintained by Alan Zhu. Check out the
          GitHub link in the menu bar to learn more!
        </p>
      </div>
    </MenuSlidingPane>
  );
}

export default AboutPane;
