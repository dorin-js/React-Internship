import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.module.css';

const Modal = ({ title, onClose, children }) => (
  <div className={classes.modal}>
    <span className={classes.modalTitle}>{title}</span>
    <button type="button" className={classes.closeIcon} onClick={onClose}>
      X
    </button>
    {children}
  </div>
);

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
Modal.defaultProps = {
  title: '',
};

export default Modal;
