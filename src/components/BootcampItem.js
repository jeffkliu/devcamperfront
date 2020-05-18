import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapsible from './Collapsible';
import axios from 'axios';

export class BootcampItem extends Component {
  state = {
    courses: [],
    bootcamp: { ...this.props.bootcamp },
    view: '',
    clicked: false,
  };
  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      border: '1px #ccc dotted',
      position: 'relative',
      //textDecoration: this.props.bootcamp.completed ? 'line-through' : 'none',
    };
  };

  getCourses = (id) => {
    axios
      .get(`https://amer-demo14-test.apigee.net/api/v1/bootcamps/${id}/courses`)
      .then((res) => {
        this.setState({
          view: 'Courses',
          courses: res.data.data,
          clicked: !this.state.clicked,
        });
        this.child.togglePanel();
      });
  };

  getBootcamps = () => {
    this.setState({ view: 'Bootcamps', clicked: !this.state.clicked });
    this.child.togglePanel();
  };

  renderSwitch = (c) => {
    switch (c) {
      case 'Bootcamps':
        return JSON.stringify(this.state.bootcamp, null, 2);
      case 'Courses':
        return JSON.stringify(this.state.courses, null, 2);
      default:
        return 'Please select buttons on right for more information.';
    }
  };

  render() {
    return (
      <div style={this.getStyle()}>
        <button
          onClick={this.props.delBootcamp.bind(this, this.state.bootcamp.id)}
          style={btnStyle}
        >
          x
        </button>
        <button onClick={this.getBootcamps} style={bootcampButton}>
          Bootcamp Detail
        </button>
        <button
          onClick={this.getCourses.bind(this, this.state.bootcamp.id)}
          style={courseButton}
        >
          Courses Detail
        </button>
        <Collapsible
          clicked={this.state.clicked}
          onRef={(ref) => (this.child = ref)}
          title={this.state.bootcamp.name}
        >
          <div>
            <h1>{this.state.view}</h1>
            <pre>{this.renderSwitch(this.state.view)}</pre>
          </div>
        </Collapsible>
      </div>
    );
  }
}

// PropTypes
BootcampItem.propTypes = {
  bootcamp: PropTypes.object.isRequired,
};

const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '5px 9px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right',
};

const courseButton = {
  position: 'relative',
  float: 'right',
  right: '12px',
  top: '5px',
};

const bootcampButton = {
  position: 'relative',
  float: 'right',
  right: '10px',
  top: '5px',
};

export default BootcampItem;
