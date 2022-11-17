import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { usersApi } from '../../../common/services/usersApi';
import { Button } from '../../../common/components/Button';

const UserRow = ({ user, onDelete, onUserDetails }) => {
  const [loading, setLoading] = useState(false);

  const {
    _uuid: id, name, lastname, email, birth,
  } = user;

  const deleteUser = async () => {
    setLoading(true);
    try {
      await usersApi.deleteUserById(id);
      onDelete(id);
    } catch (e) {
      // handle error locally
    }
    setLoading(false);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{lastname}</td>
      <td>{email}</td>
      <td>{birth}</td>
      <td>
        <div className="buttonsContainer">
          <Button
            value="Show Details"
            onClick={() => onUserDetails(user)}
          />
          <Button
            value={loading ? 'Deleting...' : 'Delete'}
            onClick={deleteUser}
            disabled={loading && true}
          />
        </div>
      </td>
    </tr>
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
  onDelete: PropTypes.func,
  onUserDetails: PropTypes.func,
};
UserRow.defaultProps = {
  user: {},
  onDelete: undefined,
  onUserDetails: undefined,
};

export default UserRow;
