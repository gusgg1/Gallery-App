import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({match}) => {

  console.log(match)

  return (
    <nav className="main-nav">
      <ul>
        {/* {(match === '/') ? <li><NavLink to="/">Home</NavLink></li> : null} */}

        {/* <li><a href='#'>Cats</a></li> */}
        <li><NavLink to="/cats">Cats</NavLink></li>
        <li><NavLink to="/dogs">Dogs</NavLink></li>
        <li><NavLink to="/computers">Computers</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
