import React from 'react';
import 'reflect-metadata';
import 'es6-shim';
import './App.css';
import Game from './Game/Game';
import MenuBar from './MenuBar/MenuBar';

function App() {
  return (
    <div className='App'>
      <MenuBar />
      <Game />
    </div>
  );
}

export default App;
