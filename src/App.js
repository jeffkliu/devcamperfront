import React, { Component } from 'react';
import Bootcamps from './components/Bootcamps';
import './App.css';

class App extends Component {
  state = {
    bootcamps: [
      {
        id: 1,
        title: 'Bootcamp1',
        completed: false,
      },
      {
        id: 2,
        title: 'Bootcamp2',
        completed: false,
      },
      {
        id: 3,
        title: 'Bootcamp3',
        completed: false,
      },
    ],
  };

  render() {
    return (
      <div className="App">
        <Bootcamps bootcamps={this.state.bootcamps} />
      </div>
    );
  }
}

export default App;
