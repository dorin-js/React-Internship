import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './UserForm.module.css';
import { usersApi } from '../../../common/services/usersApi/usersApi';
import { Snackbar } from '../../../common/components/Snackbar';
import { Button } from '../../../common/components/Button';

const defaultFormData = {
  name: '',
  lastname: '',
  email: '',
  birth: '',
};

const UserForm = ({ onCreateUser }) => {
  const [form, setForm] = useState(defaultFormData);
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);

  const createUser = async (body) => {
    setLoading(true);
    try {
      const res = await usersApi.postUser(body);
      onCreateUser(res);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const onValueChanged = (value) => {
    setForm({ ...form, ...value });
  };

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
          <Button data-testid="submit-button" onClick={() => createUser(form)} value={loading ? 'Creating...' : 'Create User'} />
        </div>
      </form>
      {
        error && <Snackbar type="error" message={error} timeout={4} />
      }
    </>
  );
};

UserForm.propTypes = {
  onCreateUser: PropTypes.func,
};
UserForm.defaultProps = {
  onCreateUser: () => undefined,
};

export default UserForm;
