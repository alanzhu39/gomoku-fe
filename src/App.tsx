/* eslint-disable */
import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component<any, {message: string}> {
  ws: WebSocket;
  inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.state = {
      message: ''
    };

    this.handleClick = this.handleClick.bind(this);

    this.ws = new WebSocket("ws://localhost:8080/lobby/create");
    this.inputRef = React.createRef<HTMLInputElement>();
  }

  handleClick() {
    if (this.inputRef.current?.value) {
      this.ws.send(this.inputRef.current.value);
    }
  }

  componentDidMount() {
    this.ws.onmessage = (event) => {
      this.setState({
        message: event.data
      })
    };

    // axios.get('http://localhost:8080/lobby/create').then((response) => {
    //   this.setState({
    //     message: response.data
    //   })
    // });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>{this.state.message}</p>

          <input
            ref={this.inputRef}
            type="text"
          />
          <br />
          <button onClick={this.handleClick}>Submit</button>
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
}

export default App;
