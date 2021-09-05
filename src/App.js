import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import React, { Component } from 'react'
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from "./components/Modal/Modal";
import { ToastContainer } from 'react-toastify';

export class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    url: ''
  }

  onSubmitHandler = searchQuery => { this.setState({ searchQuery }) }
  onCloseHandler = (url) => {
    this.setState(({ showModal }) => ({ showModal: !showModal, url: url }))
  }
  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmitHandler} />
        <ImageGallery searchQuery={this.state.searchQuery} onClick={this.onCloseHandler} />
        {this.state.showModal && <Modal url={this.state.url} onClose={this.onCloseHandler} />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    )
  }
}

export default App

