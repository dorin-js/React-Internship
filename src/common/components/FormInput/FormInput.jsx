import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import classes from './FormInput.module.css';
import validator from '../../../features/user/UserForm/__fixtures__/validator';

const FormInput = ({ name, ...props }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className={classes.inputContainer}>
      <input
        className={`${classes.input} ${errors[name] && classes.inputError}`}
        {...register(name, validator[name])}
        {...props}
      />
      {errors[name] && (<p role="alert">{errors[name]?.message}</p>)}
    </div>
  );
};

FormInput.propTypes = {
  name: PropTypes.string,
};
FormInput.defaultProps = {
  name: undefined,
};

export default FormInput;
