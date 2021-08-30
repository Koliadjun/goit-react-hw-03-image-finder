import React from 'react';
import PropTypes from 'prop-types';
const Button = ({ children, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};
Button.propType = {
  children: PropTypes.element,
  onClick: PropTypes.func.isRequired,
};
export default Button;
