import React, { Component } from 'react';
import BootcampItem from './BootcampItem';
import PropTypes from 'prop-types';
import axios from 'axios';

class Bootcamps extends Component {
  render() {
    return this.props.bootcamps.map((bootcamp) => (
      <BootcampItem
        key={bootcamp.id}
        bootcamp={bootcamp}
        delBootcamp={this.props.delBootcamp}
      />
    ));
  }
}

// PropTypes
Bootcamps.propTypes = {
  bootcamps: PropTypes.array.isRequired,
};

export default Bootcamps;
