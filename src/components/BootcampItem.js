import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapsible from './Collapsible';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Popup from 'reactjs-popup';
import Form from 'react-bootstrap/Form';
import AddCourse from './AddCourse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export class BootcampItem extends Component {
  state = {
    courses: [],
    bootcamp: { ...this.props.bootcamp },
    view: '',
    clicked: false,
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

  // add Course
  addCourse = (id, obj) => {
    this.setState({
      bootcamps: [...this.state.courses, obj],
    });
    axios
      .post(
        `https://amer-demo14-test.apigee.net/api/v1/bootcamps/${id}/courses`,
        obj
      )
      .then((res) => {
        console.log('Success');
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
      //          onClick={this.props.delBootcamp.bind(this, this.state.bootcamp.id)}
    }
  };

  render() {
    return (
      <div className="bootcamp">
        <FontAwesomeIcon
          icon={faTrash}
          style={{
            margin: '5px',
            cursor: 'pointer',
            float: 'right',
          }}
          onClick={this.props.delBootcamp.bind(this, this.state.bootcamp.id)}
        />
        <Button
          className="getbootcampbtn"
          onClick={this.getBootcamps}
          variant="outline-primary"
          size="sm"
        >
          Get Bootcamp
        </Button>{' '}
        <Button
          className="getcoursesbtn"
          onClick={this.getCourses.bind(this, this.state.bootcamp.id)}
          size="sm"
        >
          Courses Detail
        </Button>
        <br />
        <div>
          <Collapsible
            clicked={this.state.clicked}
            onRef={(ref) => (this.child = ref)}
            title={this.state.bootcamp.name}
            className="bootcamptitle"
            cost={this.state.bootcamp.averageCost}
            closeOnDocumentClick
          >
            <div className="header">
              <h1 style={{ display: 'inline-block' }}>{this.state.view}</h1>{' '}
              {this.state.view === 'Courses' ? (
                <AddCourse
                  addCourse={this.addCourse}
                  bootcampId={this.state.bootcamp.id}
                />
              ) : null}
              <pre>{this.renderSwitch(this.state.view)}</pre>
            </div>
          </Collapsible>
        </div>
      </div>
    );
  }
}

// PropTypes
BootcampItem.propTypes = {
  bootcamp: PropTypes.object.isRequired,
};

export default BootcampItem;
