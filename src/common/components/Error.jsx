import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ error }) => (
  <h4>
    Ups!
    {' '}
    {error}
  </h4>
);

Error.propTypes = {
  error: PropTypes.string,
};
Error.defaultProps = {
  error: '',
};

export default Error;
