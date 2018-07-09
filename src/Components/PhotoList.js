import React, { Component } from 'react';
import Photo from './Photo';
import Loading from 'react-loading-animation';

class PhotoList extends Component {
 
  render() {
    return (
      <div className="photo-container">
        {
          this.props.match.match.url === '/' || this.props.match.match.url === '/search' ? 
            <p><span className="styled">Results for:</span> {this.props.tag}</p>
            :
            null
        }
          
        {
          this.props.isLoading ? 
            <Loading /> 
            : 
            <Photo match={this.props.match} images={this.props.images} />
        }
      </div>
    );
  }
}

export default PhotoList;
