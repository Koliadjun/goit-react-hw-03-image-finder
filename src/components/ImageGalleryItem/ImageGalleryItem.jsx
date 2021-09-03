import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  //   static propTypes = { image: PropTypes.array.isRequired };

  render() {
    const { src, onClick } = this.props;
    return (
      <li
        className="ImageGalleryItem"
        onClick={() => onClick(this.props.largeImg)}
      >
        <img src={src} alt="" className="ImageGalleryItem-image" />
      </li>
    );
  }
}

export default ImageGalleryItem;
