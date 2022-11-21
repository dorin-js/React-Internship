import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { usersApi } from '../../../common/services/usersApi';
import { Button } from '../../../common/components/Button';
import { Snackbar } from '../../../common/components/Snackbar';
import Portal from '../../../common/components/Portal';

const UserRow = ({ user, onDoneDelete, onUserDetails }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    _uuid: id, name, lastname, email, birth,
  } = user;

  const deleteUser = async () => {
    setLoading(true);
    try {
      await usersApi.deleteUserById(id);
      onDoneDelete();
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <>
      <tr data-testid={`row-${name}`}>
        <td>{name}</td>
        <td>{lastname}</td>
        <td>{email}</td>
        <td>{birth}</td>
        <td>
          <div className="buttonsContainer">
            <Button
              data-testid={`${id}-details`}
              value="Show Details"
              onClick={() => onUserDetails(user)}
            />
            <Button
              data-testid={`${id}-delete`}
              value={loading ? 'Deleting...' : 'Delete'}
              onClick={deleteUser}
              disabled={loading && true}
            />
          </div>
        </td>
      </tr>
      {
        error && (
          <Portal>
            <Snackbar type="error" message={error} timeout={4000} />
          </Portal>
        )
      }
    </>
  );
};

UserRow.propTypes = {
  user: PropTypes.PropTypes.shape({
    _uuid: PropTypes.string,
    name: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    birth: PropTypes.string,
  }),
  onDoneDelete: PropTypes.func,
  onUserDetails: PropTypes.func,
};
UserRow.defaultProps = {
  user: {},
  onDoneDelete: undefined,
  onUserDetails: undefined,
};

export default UserRow;
