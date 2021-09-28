import React from "react";
import {
  Modal,
  Alert,
} from "react-bootstrap";

import './style/AlertModal.css'

const AlertModal = (props: { showCondition: boolean; msg: string }) => {
  const { showCondition, msg } = props;
  return (
    <Modal backdropClassName='alert-backdrop' contentClassName='alert-model-content' show={showCondition} className="modal-alert">
      <Alert className="alert" >
        <p className="mb-0">{msg}</p>
      </Alert>
    </Modal>
  );
};

export default AlertModal;
