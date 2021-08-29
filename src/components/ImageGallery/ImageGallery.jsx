import PropTypes from 'prop-types';
import React from 'react';

const ImageGallery = () => {
  return <ul className="ImageGallery">{this.props.children}</ul>;
};

ImageGallery.propTypes = { children: PropTypes.element };

export default ImageGallery;
