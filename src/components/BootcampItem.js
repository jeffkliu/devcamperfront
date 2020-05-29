import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import Collapsible from './Collapsible';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Popup from 'reactjs-popup';
import Form from 'react-bootstrap/Form';
import AddCourse from './AddCourse';
import CourseItem from './CourseItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  useHistory,
} from 'react-router-dom';

export class BootcampItem extends Component {
  state = {
    courses: [],
    bootcamp: { ...this.props.bootcamp },
    view: '',
    courseClicked: false,
    bootcampClicked: false,
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BOOTCAMP_HOST}/api/v1/bootcamps/${this.state.bootcamp.id}/courses`
      )
      .then((res) => {
        this.setState({
          courses: res.data.data,
        });
      });
  }

  getCourses = () => {
    this.setState(
      {
        view: 'Courses',
        courseClicked: !this.state.courseClicked,
      },
      this.child.togglePanel()
    );
  };

  getBootcamps = () => {
    this.props.history.push({
      pathname: '/bootcamps',
      search: `${this.state.bootcamp.id}`,
      state: this.state,
    });

    this.setState(
      {
        view: 'Bootcamps',
        bootcampClicked: !this.state.bootcampClicked,
      },
      this.child.togglePanel()
    );
  };

  delCourse = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BOOTCAMP_HOST}/api/v1/courses/${id}`)
      .then((res) => {
        this.setState(
          {
            courses: [
              ...this.state.courses.filter((course) => course._id !== id),
            ],
          },
          function () {
            console.log('Success');
          }
        );
      });
  };

  // add Course
  addCourse = (id, obj) => {
    axios
      .post(
        `${process.env.REACT_APP_BOOTCAMP_HOST}/api/v1/bootcamps/${id}/courses`,
        obj
      )
      .then((res) => {
        this.setState(
          {
            courses: [...this.state.courses, obj],
          },
          function () {
            console.log('Success');
          }
        );
      });
  };

  renderSwitch = (c) => {
    switch (c) {
      case 'Bootcamps':
        return JSON.stringify(this.state.bootcamp, null, 2);
      case 'Courses':
        return this.state.courses.map((course) => (
          <CourseItem delCourse={this.delCourse} course={course} />
        ));
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
          onClick={this.getCourses.bind(this)}
          size="sm"
        >
          Courses Detail
        </Button>
        <Collapsible
          courseClicked={this.state.courseClicked}
          bootcampClicked={this.state.bootcampClicked}
          onRef={(ref) => (this.child = ref)}
          title={this.state.bootcamp.name}
          className="bootcamptitle"
          cost={this.state.bootcamp.averageCost}
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
    );
  }
}

// PropTypes
BootcampItem.propTypes = {
  bootcamp: PropTypes.object.isRequired,
};

export default withRouter(BootcampItem);
