import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { UserForm } from '../../features/users/UserForm';
import Portal from '../components/Portal';

const CreateUser = ({ onDoneCreate }) => {
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible((currentState) => !currentState);

  const createUser = () => {
    onDoneCreate();
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
    </>
  );
};

CreateUser.propTypes = {
  onDoneCreate: PropTypes.func.isRequired,
};

export default CreateUser;
