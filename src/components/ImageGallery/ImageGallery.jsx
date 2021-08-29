import PropTypes from 'prop-types';
import React from 'react';

const ImageGallery = ({ children }) => {
  return <ul className="ImageGallery">{children}</ul>;
};

ImageGallery.propTypes = { children: PropTypes.element };

export default ImageGallery;
