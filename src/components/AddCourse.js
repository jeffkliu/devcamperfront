import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class AddCourse extends Component {
  state = {
    scholarshipAvailable: false,
    title: 'Best Course Ever',
    description:
      'This course will provide you with everything you need in life. lol',
    weeks: '8',
    minimumSkill: 'beginner',
    bootcamp: this.props.bootcampId,
    tuition: 5000,
  };

  componentDidMount() {
    this.setState({ ...this.state });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    const { addCourse } = this.props;

    e.preventDefault();
    this.setState({ ...this.state });
    addCourse(this.state.bootcamp, { ...this.state });
  };

  render() {
    return (
      <Popup
        trigger={
          <Button
            variant="outline-primary"
            style={{
              display: 'inline-block',
              margin: '5px',
              bottom: '3px',
            }}
          >
            Add Course
          </Button>
        }
        position="right center"
        contentStyle={{
          padding: '0px',
          border: 'none',
        }}
        closeOnDocumentClick
      >
        <Form
          noValidate
          validated={this.state.validated}
          className="form"
          onSubmit={this.onSubmit}
        >
          <Form.Group controlId="formName">
            <Form.Label>Title: </Form.Label>
            <Form.Control
              onChange={this.onChange}
              type="text"
              defaultValue={this.state.title}
              name="title"
              placeholder="Enter Course Title"
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description: </Form.Label>
            <Form.Control
              defaultValue={this.state.description}
              onChange={this.onChange}
              type="text"
              name="description"
              placeholder="Enter Description"
              required
            />
          </Form.Group>

          <Form.Group controlId="formCost">
            <Form.Label>Tuition: </Form.Label>
            <Form.Control
              defaultValue={this.state.tuition}
              onChange={this.onChange}
              type="number"
              name="tuition"
              placeholder="Enter tuition cost:"
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Phone: </Form.Label>
            <Form.Control
              defaultValue={this.state.phone}
              onChange={this.onChange}
              type="text"
              name="phone"
              placeholder="(444)444-4444"
              required
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>Min Skill: </Form.Label>
            <Form.Control
              defaultValue={this.state.minimumSkill}
              onChange={this.onChange}
              type="text"
              name="minimumSkill"
              placeholder="beginner, intermediate, advanced"
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>Weeks: </Form.Label>
            <Form.Control
              defaultValue={this.state.weeks}
              onChange={this.onChange}
              type="text"
              name="weeks"
              placeholder="8"
            />
          </Form.Group>

          <Button
            className="formButton"
            variant="primary"
            size="sm"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Popup>
    );
  }
}
