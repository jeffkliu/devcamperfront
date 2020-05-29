import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Bootcamps from './components/Bootcamps';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import CourseItem from './components/CourseItem';
import Cart from './components/Cart';
import AddBootcamp from './components/AddBootcamp';
import BootcampItem from './components/BootcampItem';
//import { v4 as uuid } from 'uuid';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bootcamps: [],
      pageLimit: 10,
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BOOTCAMP_HOST}/api/v1/bootcamps`)
      .then((res) => {
        this.setState({ bootcamps: res.data.data });
      });
  }

  delBootcamp = (id) => {
    this.setState({
      bootcamps: [
        ...this.state.bootcamps.filter((bootcamp) => bootcamp.id !== id),
      ],
    });
    axios
      .delete(`${process.env.REACT_APP_BOOTCAMP_HOST}/api/v1/bootcamps/${id}`)
      .then((res) => {
        console.log(res.data);
      });
  };

  // add Bootcamp
  addBootcamp = (obj) => {
    axios
      .post(`${process.env.REACT_APP_BOOTCAMP_HOST}/api/v1/bootcamps`, obj)
      .then((res) => {
        this.setState({
          bootcamps: [...this.state.bootcamps, res.data.data],
        });
      });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/bootcamps"
              render={(props) => (
                <React.Fragment>
                  <AddBootcamp addBootcamp={this.addBootcamp} />
                  <Bootcamps
                    bootcamps={this.state.bootcamps}
                    delBootcamp={this.delBootcamp}
                  />
                </React.Fragment>
              )}
            />

            <Route
              path="/bootcamps/:bootcampId"
              render={(props) => (
                <BootcampItem delBootcamp={this.delBootcamp} />
              )}
            />
            <Route path="/home" component={Home}></Route>
            <Route exact path="/cart" render={(props) => <Cart />}></Route>
            <Route path="/courses" component={CourseItem}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
