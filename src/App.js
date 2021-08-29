import './App.css';
import React, { Component } from 'react'
import Searchbar from './components/Searchbar/Searchbar';

export class App extends Component {
  state = {
    searchQuery: ''
  }

  onSubmitHandler = searchQuery => { this.setState({ searchQuery }) }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmitHandler} />
      </>
    )
  }
}

export default App

