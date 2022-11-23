import React, { useState } from 'react';
import 'reflect-metadata';
import 'es6-shim';
import './App.css';
import Game from './Game/Game';
import MenuBar from './MenuBar/MenuBar';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import InstructionsPane from './MenuBar/InstructionsPane';
import AboutPane from './MenuBar/AboutPane';

function App() {
  const [panes, setPanes] = useState({
    aboutPane: false,
    instructionsPane: false
  });

  function closeAboutPane() {
    setPanes({ ...panes, aboutPane: false });
  }

  function closeInstructionsPane() {
    setPanes({ ...panes, instructionsPane: false });
  }

  return (
    <div className='App'>
      <MenuBar panes={panes} setPanes={setPanes} />
      <InstructionsPane
        isOpen={panes.instructionsPane}
        onRequestClose={closeInstructionsPane}
      />
      <AboutPane isOpen={panes.aboutPane} onRequestClose={closeAboutPane} />
      <Game />
    </div>
  );
}

export default App;
