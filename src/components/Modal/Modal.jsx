import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
const modalDiv = document.querySelector('#modal-root');
export class Modal extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    scr: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };
  state = {};
  componentDidMount() {
    window.addEventListener('keydown', this.keyPressHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyPressHandler);
  }

  keyPressHandler = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  backDropClickHandle = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.backDropClickHandle}>
        <div className="Modal">
          <img src={this.props.url} alt="large img" />
        </div>
      </div>,
      modalDiv,
    );
  }
}

export default Modal;
