import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';

const Button = ({ value, ...props }) => (
  <button
    type="button"
    name={value}
    className={classes.button}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <span className={classes.buttonText}>{value}</span>
  </button>
);

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  onClick: undefined,
  disabled: false,
};

export default Button;
