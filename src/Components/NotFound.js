import React from 'react';

const NotFound = (props) => (
  props.match.location.pathname === '/search' ? 
  null
  :
  <div className="main-content not-found">
    <h2>404</h2>
    <i className="material-icons icn-error">error_outline</i>
    <h2>Page Not Found</h2>
  </div>  
);

export default NotFound;
