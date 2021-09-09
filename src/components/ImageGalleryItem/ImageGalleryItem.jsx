import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static propTypes = {
    key: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    largeImg: PropTypes.string.isRequired,
  };

  render() {
    const { src, onClick, largeImg } = this.props;
    return (
      <li className="ImageGalleryItem" onClick={() => onClick(largeImg)}>
        <img src={src} alt="" className="ImageGalleryItem-image" />
      </li>
    );
  }
}

export default ImageGalleryItem;
