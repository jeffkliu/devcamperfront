import React, { Component, useState } from 'react';
import Collapsible from './Collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Popup from 'reactjs-popup';
import Cart from './Cart';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  useHistory,
} from 'react-router-dom';

export class CourseItem extends Component {
  state = {
    course: { ...this.props.course },
  };

  onClick = (e) => {
    axios
      .post(`${process.env.REACT_APP_CART_HOST}/api/v1/cart`, this.state)
      .then((res) => {
        console.log('Success');
      })
      .catch((err) => alert('Course already in Cart!'));
  };

  render() {
    return (
      <div className="course">
        <Collapsible
          onRef={(ref) => (this.child = ref)}
          title={this.state.course.title}
          cost={this.state.course.tuition}
        >
          <Button onClick={this.onClick} style={{ float: 'right' }}>
            Add to Cart
          </Button>
          {JSON.stringify(this.state.course, null, 2)}
        </Collapsible>
      </div>
    );
  }
}

export default withRouter(CourseItem);
