import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import classes from './UserForm.module.css';
import { Button } from '../../../common/components/Button';
import { useCreateNewUserMutation, useUpdateUserMutation } from '../../../services/api/apiService';
import { Snackbar } from '../../../common/components/Snackbar';

const defaultFormData = {
  id: '',
  name: '',
  lastname: '',
  email: '',
  birth: '',
};

const UserForm = ({ isEditing, user }) => {
  const [form, setForm] = useState(defaultFormData);

  useEffect(() => {
    if (user?.name) {
      setForm(user);
    }
  }, [user]);

  const [updateUser, {
    isLoading: isUpdatingInProgress,
    isError: isUpdateUserInfoError,
    error: updateUserInfoError,
  }] = useUpdateUserMutation();

  const [createNewUser, {
    isSuccess,
    isLoading: isCreatingInProgress,
    isError: isCreateNewUserError,
    error: createNewUserError,
  }] = useCreateNewUserMutation();

  const onValueChanged = (value) => {
    setForm((prevState) => ({ ...prevState, ...value }));
  };

  useEffect(() => {
    if (isSuccess) {
      setForm(defaultFormData);
    }
  }, [isSuccess]);

  return (
    <>
      <form
        name="form"
        className={classes.createUserForm}
      >
        <input
          required
          placeholder="First Name"
          value={form.name}
          onChange={(e) => onValueChanged({ name: e.target.value })}
        />
        <input
          required
          placeholder="Last Name"
          value={form.lastname}
          onChange={(e) => onValueChanged({ lastname: e.target.value })}
        />
        <input
          type="email"
          data-testid="email-input-field"
          required
          placeholder="Email"
          value={form.email}
          onChange={(e) => onValueChanged({ email: e.target.value })}
        />
        <input
          type="date"
          required
          placeholder="Date of birth"
          value={form.birth}
          onChange={(e) => onValueChanged({ birth: e.target.value })}
        />
        {
          isEditing
            ? (
              <Button
                value={isUpdatingInProgress ? 'Saving...' : 'Save'}
                onClick={() => updateUser(form)}
              />
            )
            : (
              <Button
                value={isCreatingInProgress ? 'Creating...' : 'Create'}
                onClick={() => createNewUser(form)}
              />
            )
        }
      </form>
      {isCreateNewUserError && <Snackbar type="error" message={createNewUserError.data.error} timeout={4000} />}
      {isUpdateUserInfoError && <Snackbar type="error" message={updateUserInfoError.data.error} timeout={4000} />}
    </>
  );
};

UserForm.propTypes = {
  user: PropTypes.PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    birth: PropTypes.string,
  }),
  isEditing: PropTypes.bool,
};
UserForm.defaultProps = {
  user: {},
  isEditing: undefined,
};

export default UserForm;
