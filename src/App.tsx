/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  function handleClick() {
    if (inputRef.current?.value) {
      ws.send(inputRef.current.value);
    }
  }

  const ws = new WebSocket("ws://localhost:8080/connect/");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ws.onmessage = (event) => {
      setMessage(event.data)
    };

    // axios.get('http://localhost:8080/lobby/create').then((response) => {
    //   this.setState({
    //     message: response.data
    //   })
    // });
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>{message}</p>

        <input
          ref={inputRef}
          type="text"
        />
        <br />
        <button onClick={handleClick}>Submit</button>
        <br />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
