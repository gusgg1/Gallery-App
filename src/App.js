import React, { Component } from 'react';
import './App.css';
import apiKey from './config';
import Loading from 'react-loading-animation';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// Components
import SearchForm from './Components/SearchForm';
import Navigation from './Components/Navigation';
import PhotoList from './Components/PhotoList';
import NotFound from './Components/NotFound';


class App extends Component {

  constructor() {
    super();
    this.state = {
      images: [],
      tag: 'borabora',
      cats: [],
      loading: true
    };
  }

  componentDidMount() {
    this.performFetch(this.state.tag);
  }

  componentWillReceiveProps(props) {
    if (props.tag !== this.state.tag) {
      this.performFetch(props.tag);
    }
  }

  performFetch = (tags) => {
    if (tags) {
      tags = [tags, 'cats', 'dogs', 'computers'];
    } else {
      tags = ['cats', 'dogs', 'computers'];
    }
    Promise.all(tags.map(tag =>
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&safe_search=1&format=json&nojsoncallback=1`)
      .then(resp => resp.json())
    )).then(data => {
      // console.log(data)
      // console.log(data[0].photos.photo)
      this.setState({
        images: data,
        loading: false
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

/*
  performFetch = (tag) => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&safe_search=1&format=json&nojsoncallback=1`)
      .then(res => {
        this.setState({
          photos: res.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }
*/

  notFetched = () => {
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
    }
  }


  render() {
    // console.log(this.state.photos);
    // console.log(this.state.images[1].photos);
    // console.log(this.performFetch('cats'));
    
    return (
      <BrowserRouter>
        <div className="container"> 

          <Route exact path="/" render={() => <SearchForm onSearch={this.performFetch} isLoading={this.notFetched} />} />

          {/* <SearchForm onSearch={this.performFetch} isLoading={this.notFetched} /> */}

          <Navigation />

          {/* // {
          //   (this.state.loading) ?
          //     <Loading />
          //     :
          //     <PhotoList data={this.state.photos} />
          // } */}

          <Switch>
            <Route exact path="/" render={(match) => (this.state.loading) ? <Loading /> : <PhotoList matchObj={match} data={this.state.images[0].photos.photo} />} />
            
              
            {/* <Route path="/:linksTextContent" render={(match) => <PhotoList data={this.state.cats} matchObj={match} onLink={this.performFetch} />} /> */}


            
            {/* <Route path="/:linksTextContent" render={(match) => <PhotoList data={this.state.images} matchObj={match} />} /> */}

            <Route path="/cats" render={(match) => <PhotoList data={this.state.images[1].photos.photo} matchObj={match} />} />
            <Route path="/dogs" render={(match) => <PhotoList data={this.state.images[2].photos.photo} matchObj={match} />} />            
            <Route path="/computers" render={(match) => <PhotoList data={this.state.images[3].photos.photo} matchObj={match} />} />
            <Route component={NotFound} /> 
          </Switch> 

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
