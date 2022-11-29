import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ errorMessage }) => (
  <h4>
    Ups, It looks like there is an error!
    {' '}
    {errorMessage}
  </h4>
);

Error.propTypes = {
  errorMessage: PropTypes.string,
};
Error.defaultProps = {
  errorMessage: '',
};

export default Error;
