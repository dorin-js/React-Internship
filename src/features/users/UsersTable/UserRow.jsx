import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../common/components/Button';
import { Snackbar } from '../../../common/components/Snackbar';
import Portal from '../../../common/components/Portal';
import { useDeleteUserMutation, useUpdateUserMutation } from '../../../services/api/apiService';
import Modal from '../../../common/components/Modal/Modal';
import UserForm from '../UserForm/UserForm';

const UserRow = ({ user, onUserDetails }) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    id, name, lastname, email, birth,
  } = user;

  const [deleteUser, {
    isLoading: isDeleteInProgress,
    isError: isErrorOnDeletingUser,
    error: deleteUserError,
  }] = useDeleteUserMutation();

  const onUpdateUser = () => {
    setIsEditing(true);
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
              value={isDeleteInProgress ? 'Deleting...' : 'Delete'}
              onClick={() => deleteUser(id)}
              disabled={isDeleteInProgress && true}
            />
            <Button
              value="Modify"
              onClick={onUpdateUser}
            />
          </div>
        </td>
      </tr>
      {
        isErrorOnDeletingUser && (
          <Portal>
            <Snackbar type="error" message={isErrorOnDeletingUser.data.error} timeout={4000} />
          </Portal>
        )
      }
      {
        isEditing && (
          <Portal>
            <Modal title="Update user" onClose={() => setIsEditing(false)}>
              <UserForm user={user} isEditing={isEditing} />
            </Modal>
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
