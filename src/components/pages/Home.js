import React from 'react';
//import axios from 'axios';

const homeStyle = {
  fontWeight: '900',
};

export default function Home() {
  return (
    <React.Fragment>
      <h1 style={homeStyle}>Home</h1>
      <p>FrontEnd of Bootcamp APIs</p>
      <br />
      <img src="https://www.cyberark.com/wp-content/uploads/2019/11/Developer.jpg" />
    </React.Fragment>
  );
}
