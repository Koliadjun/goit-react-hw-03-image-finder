import React from 'react';
import PropTypes from 'prop-types';
import s from './button.module.css';
const Button = ({ children, onClick }) => {
  return (
    <button className={s.Button} type="button" onClick={onClick}>
      {children}
    </button>
  );
};
Button.propType = {
  children: PropTypes.element,
  onClick: PropTypes.func.isRequired,
};
export default Button;
