import React from 'react';
import NoPhotos from './NoPhotos';

const Photo = (props, {match}) => {
  const results = props.images;
  let images;
  images = results.map((image) =>
    <li key={image.id}>
      <img src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} alt={image.title}/>
    </li> 
  );

  return (
    <ul>
      {results.length === 0 && props.match.match.url === '/search' ? <NoPhotos /> : images}
    </ul>
  );
};

export default Photo;
