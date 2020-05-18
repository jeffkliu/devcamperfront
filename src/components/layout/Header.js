import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const loc = useLocation().pathname;
  return (
    <header style={headerStyle}>
      <h1>BootcampList</h1>
      <Link style={loc === '/Home' ? activeStyle : restStyle} to="/Home">
        Home
      </Link>{' '}
      |{' '}
      <Link
        style={loc === '/bootcamps' ? activeStyle : restStyle}
        to="/bootcamps"
      >
        Bootcamps
      </Link>{' '}
      |{' '}
      <Link style={loc === '/cart' ? activeStyle : restStyle} to="/cart">
        Cart
      </Link>
    </header>
  );
}

const restStyle = {
  color: '#fff',
  textDecoration: 'none',
};

const activeStyle = {
  color: '#9370DB',
  textDecoration: 'none',
};

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
};
export default Header;
