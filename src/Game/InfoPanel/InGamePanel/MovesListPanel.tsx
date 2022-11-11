import React, { useEffect, useRef, useState } from 'react';
import { LobbyState, PieceType, PlayerMove } from '../../Game';

function MovesListPanel(props: { movesList: PlayerMove[] }) {
  /**
   * Panel displaying in-game moves list
   */

  return (
    <div className='MovesListPanel'>
      <div className='MovesListGrid'>
        {props.movesList.map((playerMove, index) => {
          return (
            <div className='PlayerMoveCard' key={index}>
              {playerMove.toString()}
            </div>
          );
        })}
        {props.movesList.length % 2 === 1 && <div className='PlayerMoveCard' />}
      </div>
    </div>
  );
}

export default MovesListPanel;
