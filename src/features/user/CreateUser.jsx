import React, { useState } from 'react';
import { Button } from '../../common/components/Button';
import { Modal } from '../../common/components/Modal';
import { UserForm } from './UserForm';
import Portal from '../../common/components/Portal';

const CreateUser = () => {
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible((currentState) => !currentState);

  return (
    <>
      <Button value="New user" onClick={toggle} />
      {visible && (
        <Portal>
          <Modal title="Add new user" onClose={toggle}>
            <UserForm />
          </Modal>
        </Portal>
      )}
    </>
  );
};

export default CreateUser;
