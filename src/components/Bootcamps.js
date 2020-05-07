import React, { Component } from 'react';

class Bootcamps extends Component {
  render() {
    console.log(this.props.bootcamps);
    return this.props.bootcamps.map((bootcamp) => <h3>{bootcamp.title}</h3>);
  }
}

export default Bootcamps;
