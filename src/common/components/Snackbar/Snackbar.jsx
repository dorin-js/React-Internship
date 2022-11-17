/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classes from './Snackbar.module.css';

const Snackbar = ({ type, message, timeout }) => (
  <div className={`${classes.snackbar} ${(type === 'error' && classes.error) || (type === 'success' && classes.success)}`}>
    <span className={classes.title}>{message}</span>
  </div>
);

Snackbar.propTypes = {
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  message: PropTypes.string.isRequired,
  timeout: PropTypes.number.isRequired,
};

export default Snackbar;
