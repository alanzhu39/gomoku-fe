import React from 'react';
import SlidingPane from 'react-sliding-pane';
import './MenuBar.css';
import MenuSlidingPane from './MenuSlidingPane';

function InstructionsPane(props: { isOpen: boolean; onRequestClose: any }) {
  return (
    <MenuSlidingPane
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
    >
      <div className='InstructionsPane'>
        <h2>How to play</h2>
        <span>
          Gomoku is a 2-player game played on a 15x15 square grid, with black
          and white circular pieces.
        </span>
        <br />
        <br />
        <span>The rules of the game are simple:</span>
        <ol style={{ width: '', height: '', marginTop: 0 }}>
          <li>
            The player with the black pieces makes the first move by placing one
            of their pieces at an intersection on the board. These include
            intersections on the edges or corners of the board.
          </li>
          <li>
            Then, the player with the white pieces makes the next move, placing
            one of their pieces at an unoccupied intersection.
          </li>
          <li>
            The players continue to take turns placing one piece at a time.
          </li>
          <li>
            The first player to have five pieces in a line placed on the board,
            connected either horizontally, vertically, or diagonally, wins!
          </li>
        </ol>
      </div>
    </MenuSlidingPane>
  );
}

export default InstructionsPane;
