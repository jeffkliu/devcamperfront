import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Bootcamps from './components/Bootcamps';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';
import AddBootcamp from './components/AddBootcamp';
//import { v4 as uuid } from 'uuid';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bootcamps: [],
      courses: [],
      pageLimit: 10,
    };
  }

  componentDidMount() {
    axios
      .get('https://amer-demo14-test.apigee.net/api/v1/bootcamps')
      .then((res) => {
        this.setState({ bootcamps: res.data.data });
      });
  }

  delBootcamp = (id) => {
    axios
      .delete(`https://amer-demo14-test.apigee.net/api/v1/bootcamps/${id}`)
      .then((res) => {
        console.log(res.data);
      });
    this.setState({
      bootcamps: [
        ...this.state.bootcamps.filter((bootcamp) => bootcamp.id !== id),
      ],
    });
  };

  // add Bootcamp
  addBootcamp = (obj) => {
    this.setState({
      bootcamps: [...this.state.bootcamps, obj],
    });
    axios
      .post('https://amer-demo14-test.apigee.net/api/v1/bootcamps', obj)
      .then((res) => {
        console.log('Sucess');
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
                  <AddBootcamp
                    onRef={(ref) => (this.child = ref)}
                    addBootcamp={this.addBootcamp}
                  />
                  <Bootcamps
                    bootcamps={this.state.bootcamps}
                    delBootcamp={this.delBootcamp}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/home" component={Home}></Route>
            <Route path="/cart" component={Cart}></Route>
            <Route path="/courses" component={Cart}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
