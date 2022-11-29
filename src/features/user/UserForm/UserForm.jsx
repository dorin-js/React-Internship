/* eslint-disable no-useless-escape */
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import classes from './UserForm.module.css';
import { Button } from '../../../common/components/Button';
import { useCreateNewUserMutation, useUpdateUserMutation } from '../../../services/api/apiService';
import { Snackbar } from '../../../common/components/Snackbar';

const UserForm = ({ isEditing, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (isEditing) {
      const fields = ['firstname', 'lastname', 'email', 'birthDate', 'id'];
      fields.forEach((field) => setValue(field, user[field]));
    }
  }, [isEditing, setValue, user]);

  const [updateUser, {
    isLoading: isUpdatingInProgress,
    isError: isUpdateUserError,
    error: updateUserError,
  }] = useUpdateUserMutation();

  const [createNewUser, {
    isLoading: isCreatingInProgress,
    isError: isCreateNewUserError,
    error: createNewUserError,
  }] = useCreateNewUserMutation();

  const onSubmit = (data) => {
    if (isEditing) {
      updateUser(data);
    } else {
      createNewUser(data);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        name="form"
        className={classes.createUserForm}
      >
        <div className={classes.inputContainer}>
          <input
            placeholder="First Name"
            {...register('firstname', {
              required: {
                value: true,
                message: 'First Name is required',
              },
              maxLength: {
                value: 30,
                message: 'The input is too long',
              },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'Name shoud contain letters only',
              },
            })}
          />
          <p>{errors?.firstname?.message}</p>
        </div>
        <div className={classes.inputContainer}>
          <input
            placeholder="Last Name"
            {...register('lastname', {
              required: {
                value: true,
                message: 'Last Name is required',
              },
              maxLength: {
                value: 30,
                message: 'The input is too long',
              },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'Name shoud contain letters only',
              },
            })}
          />
          <p>{errors?.lastname?.message}</p>
        </div>
        <div className={classes.inputContainer}>
          <input
            type="email"
            data-testid="email-input-field"
            placeholder="Email"
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              maxLength: {
                value: 30,
                message: 'The input is too long',
              },
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.]\w+)(\.\w{2,5})?$/,
                message: 'Incorrect email format',
              },
            })}
          />
          <p>{errors?.email?.message}</p>
        </div>
        <div className={classes.inputContainer}>
          <input
            type="date"
            placeholder="Date of birth"
            min="1900-01-01"
            max={new Date().toISOString().split('T')[0]}
            {...register('birthDate', {
              required: {
                value: true,
                message: 'Birth date is required',
              },
            })}
          />
          <p>{errors?.birthDate?.message}</p>
        </div>
        <Button
          type="submit"
          aria-label={isEditing ? 'Update user' : 'Create user'}
          value={(isUpdatingInProgress || isCreatingInProgress) ? 'Saving...' : 'Save'}
        />
      </form>
      {
        (isCreateNewUserError || isUpdateUserError)
        && (
          <Snackbar
            type="error"
            timeout={4000}
            message={
              createNewUserError?.data?.error
              || createNewUserError?.error
              || updateUserError?.data?.error
              || updateUserError?.error
            }
          />
        )
      }
    </>
  );
};

UserForm.propTypes = {
  user: PropTypes.PropTypes.shape({
    id: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    birthDate: PropTypes.string,
  }),
  isEditing: PropTypes.bool,
};
UserForm.defaultProps = {
  user: {},
  isEditing: undefined,
};

export default UserForm;
