import React, { Component } from 'react';
import './App.css';

// Components
import SearchForm from './Components/SearchForm';
import Navigation from './Components/Navigation';
import PhotoList from './Components/PhotoList';

class App extends Component {






  render() {
    return (
      <div className="container">

        <SearchForm />

        <Navigation />

        <PhotoList />

      </div>
    );
  }
}

export default App;
