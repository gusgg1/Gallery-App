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
import NoPhotos from './Components/NoPhotos';

// Container App
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      cats: [],
      dogs: [],
      computers: [],
      tag: 'borabora',
      loading: true,
      searching: false
    };
  }

  componentDidMount() {
    this.performFetch("cats"); 
    this.performFetch("dogs"); 
    this.performFetch("computers");     
    this.performFetch(this.state.tag);   
  }

  performFetch = (tag) => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&safe_search=1&format=json&nojsoncallback=1`)
    .then(resp => resp.json())
    .then(data => {
      if (tag === 'cats') {
        this.setState({ cats: data.photos.photo, loading: false });
      } else if (tag === 'computers') {
        this.setState({ computers: data.photos.photo, loading: false });
      } else if (tag === 'dogs') {
        this.setState({ dogs: data.photos.photo, loading: false });
      } else {
        this.setState({
          images: data.photos.photo,
          tag,
          loading: false
        });
      }
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  notFetched = () => {
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
    }
  }

  onSearching = () => {
    this.setState({
      searching: true
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container"> 

          <Route exact path="/search" render={match => <SearchForm match={match} isSearching={this.onSearching} onSearch={this.performFetch} isLoading={this.notFetched} />} />

          <Navigation />

          <Switch>
            
            {this.state.searching ? 
              <Route exact path="/search" render={match => (this.state.loading) ? 
                <Loading />
                : 
                <PhotoList match={match} images={this.state.images} tag={this.state.tag} />} /> 
              : 
              null}

            <Route exact path="/" render={match => <PhotoList isLoading={this.state.loading} images={this.state.images} match={match} tag={this.state.tag} />} />

            <Route exact path="/cats" render={match => <PhotoList images={this.state.cats} match={match} />} />

            <Route exact path="/dogs" render={match => <PhotoList images={this.state.dogs} match={match} />} />

            <Route exact path="/computers" render={match => <PhotoList images={this.state.computers} match={match} />} />

            <Route render={match => <NotFound match={match} />} />

          </Switch> 
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
