import React from 'react';

const NoPhotos = props => (
  <li className="not-found">
    <i className="material-icons icon-gif">sentiment_very_dissatisfied</i>
    <h3>Sorry, No Results Found</h3>
    <p>Your search did not return any results. Please try again.</p>
  </li>
);

export default NoPhotos;
