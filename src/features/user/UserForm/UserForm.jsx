/* eslint-disable no-useless-escape */
import React from 'react';
import { PropTypes } from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';
import { useCreateNewUserMutation, useUpdateUserMutation } from '../../../services/api/apiService';
import { Button } from '../../../common/components/Button';
import { Snackbar } from '../../../common/components/Snackbar';
import FormInput from '../../../common/components/FormInput/FormInput';
import DatePicker from '../../../common/components/DatePicker/DatePicker';

const UserForm = ({ isEditing, user }) => {
  const {
    firstname, lastname, email, birthDate, id,
  } = user;

  const methods = useForm(
    isEditing && {
      defaultValues: {
        firstname,
        lastname,
        email,
        birthDate,
        id,
      },
    },
  );

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
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          name="form"
        >
          <FormInput
            name="firstname"
            placeholder="First Name"
          />
          <FormInput
            name="lastname"
            placeholder="Last Name"
          />
          <FormInput
            name="email"
            placeholder="Email"
            data-testid="email-input-field"
          />
          <DatePicker
            name="birthDate"
            type="date"
            placeholder="Date of birth"
            min="1900-01-01"
          />
          <Button
            type="submit"
            aria-label={isEditing ? 'Update user' : 'Create user'}
            value={(isUpdatingInProgress || isCreatingInProgress) ? 'Saving...' : 'Save'}
          />
        </form>
      </FormProvider>
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
