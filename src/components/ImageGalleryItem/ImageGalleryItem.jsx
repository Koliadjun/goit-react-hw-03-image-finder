import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static propTypes = { image: PropTypes.array.isRequired };

  render() {
    return (
      <li className="ImageGalleryItem">
        <img src="" alt="" className="ImageGalleryItem-image" />
      </li>
    );
  }
}

export default ImageGalleryItem;
