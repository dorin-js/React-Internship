import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../common/components/Button';
import { Snackbar } from '../../../common/components/Snackbar';
import Portal from '../../../common/components/Portal';
import { useDeleteUserMutation } from '../../../services/api/apiService';

const UserRow = ({ user, onUserDetails }) => {
  const {
    id, name, lastname, email, birth,
  } = user;

  const [deleteUser, {
    isLoading,
    isError,
    error,
  }] = useDeleteUserMutation();

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
              value={isLoading ? 'Deleting...' : 'Delete'}
              onClick={() => deleteUser(id)}
              disabled={isLoading && true}
            />
          </div>
        </td>
      </tr>
      {
        isError && (
          <Portal>
            <Snackbar type="error" message={error.data.error} timeout={4000} />
          </Portal>
        )
      }
    </>
  );
};

UserRow.propTypes = {
  user: PropTypes.PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    birth: PropTypes.string,
  }),
  onUserDetails: PropTypes.func,
};
UserRow.defaultProps = {
  user: {},
  onUserDetails: undefined,
};

export default UserRow;
