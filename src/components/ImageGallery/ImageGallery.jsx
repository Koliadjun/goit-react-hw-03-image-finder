import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  static propTypes = { children: PropTypes.element };

  render() {
    return <ul className="ImageGallery">{this.props.children}</ul>;
  }
}

export default ImageGallery;
