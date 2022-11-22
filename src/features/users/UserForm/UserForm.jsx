import React, { useEffect, useState } from 'react';
import classes from './UserForm.module.css';
import { Button } from '../../../common/components/Button';
import { useCreateNewUserMutation } from '../../../services/api/apiService';
import { Snackbar } from '../../../common/components/Snackbar';

const defaultFormData = {
  name: '',
  lastname: '',
  email: '',
  birth: '',
};

const UserForm = () => {
  const [form, setForm] = useState(defaultFormData);

  const [createNewUser, {
    isSuccess,
    isLoading,
    isError,
    error,
  }] = useCreateNewUserMutation();

  const onValueChanged = (value) => {
    setForm((prevState) => ({ ...prevState, ...value }));
  };

  const onDoneCreate = (body) => {
    createNewUser(body);
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
        <div className="buttonsContainer">
          <Button
            data-testid="submit-button"
            value={isLoading ? 'Creating...' : 'Create User'}
            onClick={() => onDoneCreate(form)}
          />
        </div>
      </form>
      {isError && <Snackbar type="error" message={error.data.error} timeout={4000} />}
    </>
  );
};

export default UserForm;
