/* eslint-disable */
import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component<any, {message: string}> {
  constructor(props: any) {
    super(props);
    this.state = {
      message: ''
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/hey').then((response) => {
      this.setState({
        message: response.data
      })
    });
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
