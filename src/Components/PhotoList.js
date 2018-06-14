import React from 'react';
import Photo from './Photo';
import NoPhotos from './NoPhotos';


const PhotoList = (props) => {
  const results = props.data;

  let images;
  if (results.length > 0) {
    images = results.map((photo) => 
    <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} alt={photo.title} />);
  } else {
    images = <NoPhotos />
  }

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
        {images}
      </ul>
    </div>
  );
}

export default PhotoList;
