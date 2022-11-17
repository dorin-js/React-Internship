import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { UserForm } from '../../features/users/UserForm';
// import { Snackbar } from '../components/Snackbar';
import Portal from '../components/Portal';

const CreateUser = ({ onCreate }) => {
  const [visible, setVisible] = useState(false);
  // const [postedStats, setPostedStats] = useState({ status: '', message: '' });

  const toggle = () => setVisible((currentState) => !currentState);

  const createUser = ({ items }) => {
    onCreate(items);
    // setPostedStats({ status: 'success', message: 'Created successfuly!' });
    toggle();
  };

  return (
    <>
      <Button value="New user" onClick={toggle} />
      {visible && (
        <Portal>
          <Modal title="Add new user" onClose={toggle}>
            <UserForm onCreateUser={createUser} />
          </Modal>
        </Portal>
      )}
      {/* {
        postedStats.status
        && <Snackbar type={postedStats.status} message={postedStats.message} timeout={3} />
      } */}
    </>
  );
};

CreateUser.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default CreateUser;
