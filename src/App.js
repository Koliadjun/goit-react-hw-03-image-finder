import './App.css';
import React, { Component } from 'react'
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
  }

  onSubmitHandler = searchQuery => { this.setState({ searchQuery }) }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmitHandler} />
        <ImageGallery searchQuery={this.state.searchQuery} />
      </>
    )
  }
}

export default App

