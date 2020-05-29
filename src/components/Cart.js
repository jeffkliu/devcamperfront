import React, { Component } from 'react';
import Collapsible from './Collapsible';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
require('dotenv').config();

export default class Cart extends Component {
  state = {
    courses: [],
    totalCost: 0,
  };

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_CART_HOST}/api/v1/cart`).then((res) => {
      this.setState({ courses: res.data.data });
      if (this.state.courses.length === 0) return;

      let tuitionArray = this.state.courses.map((c) => c.course.tuition);
      let totalCost = tuitionArray.reduce((c, a) => c + a);
      this.setState({ totalCost });
    });
  }

  onClick = (id) => {
    //this.state.courses.filter((course) => course.id === id)[0].course.tuition;

    axios
      .delete(`${process.env.REACT_APP_CART_HOST}/api/v1/cart/${id}`)
      .then((res) => {
        this.setState({
          courses: [...this.state.courses.filter((course) => course.id !== id)],
          totalCost:
            this.state.totalCost -
            this.state.courses.filter((course) => course.id === id)[0].course
              .tuition,
        });
      });
  };

  render() {
    return (
      <div>
        {this.state.courses.map((course) => (
          <div className="course">
            <FontAwesomeIcon
              icon={faTrash}
              style={{
                margin: '5px',
                cursor: 'pointer',
                float: 'right',
              }}
              onClick={this.onClick.bind(this, course.id)}
            />
            <Collapsible
              onRef={(ref) => (this.child = ref)}
              title={course.course.title}
              cost={course.course.tuition}
            >
              <pre>{JSON.stringify(course, null, 2)}</pre>
            </Collapsible>
          </div>
        ))}
        <br />
        <h2>Total Cost: </h2>
        {this.state.totalCost}
      </div>
    );
  }
}
