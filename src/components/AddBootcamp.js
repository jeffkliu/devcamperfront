import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export class AddBootcamp extends Component {
  state = {
    name: 'Best Bootcamp Ever',
    description: 'Testing the bootcamp',
    website: 'https://www.testing.om',
    phone: '(444)444-4444',
    address: '6005 Brittany Avenue',
    careers: [],
    //housing: false,
    //jobAssistance: false,
    //acceptGi: false,
    email: 'test@test.com',
    validated: false,
    setValidated: false,
    //averageCost: 0,
    //averageRating: 1,
    //courses: [],
  };
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  onSubmit = (e) => {
    const { addBootcamp } = this.props;
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({ ...this.state });
    addBootcamp({ ...this.state, averageCost: 5000 });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSelect = (e) => {
    var options = e.target.options;
    for (var i = 0, l = options.length; i < l; i++) {
      if (
        options[i].selected &&
        !this.state.careers.includes(options[i].value)
      ) {
        this.state.careers.push(options[i].value);
      }
    }
    this.setState({ careers: this.state.careers });
  };

  render() {
    return (
      <Popup
        trigger={
          <Button variant="primary" className="addbootcamp">
            Add Bootcamp
          </Button>
        }
        contentStyle={{
          padding: '0px',
          border: 'none',
          position: 'sticky',
          right: '100px',
          top: '10px',
        }}
      >
        <Form
          noValidate
          validated={this.state.validated}
          className="form"
          onSubmit={this.onSubmit}
        >
          <Form.Group controlId="formName">
            <Form.Label>Name: </Form.Label>
            <Form.Control
              onChange={this.onChange}
              type="text"
              defaultValue={this.state.name}
              name="name"
              placeholder="Enter bootcamp name"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address: </Form.Label>
            <Form.Control
              defaultValue={this.state.email}
              onChange={this.onChange}
              type="email"
              name="email"
              placeholder="name@example.com"
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

          <Form.Group controlId="formWebsite">
            <Form.Label>Wesbite: </Form.Label>
            <Form.Control
              defaultValue={this.state.website}
              onChange={this.onChange}
              type="text"
              name="website"
              placeholder="Optional"
              required
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Career Select: </Form.Label>
            <Form.Control
              as="select"
              multiple
              onChange={this.onSelect}
              name="careers"
              defaultValue={this.state.careers}
              required
            >
              <option>Web Development</option>
              <option>UI/UX</option>
              <option>Mobile Development</option>
              <option>Business</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formCost">
            <Form.Label>Cost: </Form.Label>
            <Form.Control
              value={this.state.averageCost}
              onChange={this.onChange}
              type="number"
              name="averageCost"
              placeholder="Optional"
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
            <Form.Label>Address: </Form.Label>
            <Form.Control
              defaultValue={this.state.address}
              onChange={this.onChange}
              type="text"
              name="address"
              placeholder="123 Test Street, Mountain View, CA 94000"
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

export default AddBootcamp;
