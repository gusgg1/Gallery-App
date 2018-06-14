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

// Container App
class App extends Component {

  constructor() {
    super();
    this.state = {
      images: [],
      tag: 'borabora',
      loading: true,
      searching: false
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
      this.setState({
        images: data,
        loading: false
      });
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
          <Route exact path="/search" render={() => <SearchForm isSearching={this.onSearching} onSearch={this.performFetch} isLoading={this.notFetched} />} />

          <Navigation />

          <Switch>
            <Route exact path="/" render={(match) => (this.state.loading) ? <Loading /> : <PhotoList matchObj={match} data={this.state.images[0].photos.photo} />} />

            {(this.state.searching) ? <Route exact path="/search" render={(match) => (this.state.loading) ? <Loading /> : <PhotoList matchObj={match} data={this.state.images[0].photos.photo} />} /> : null}

            <Route path="/cats" render={(match) => <PhotoList data={this.state.images[1].photos.photo} matchObj={match} />} />
            <Route path="/dogs" render={(match) => <PhotoList data={this.state.images[2].photos.photo} matchObj={match} />} />            
            <Route path="/computers" render={(match) => <PhotoList data={this.state.images[3].photos.photo} matchObj={match} />} />
            <Route render={match => <NotFound matchObj={match} />} />
          </Switch> 
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
