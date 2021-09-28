import React from "react";
import { Modal, Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { MdClose } from "react-icons/md";
import "./style/RemoveConfModal.css";

const RemoveConfModal = (props: {
  onClickRemove: any;
  show: boolean;
  handleClose: any;
}) => {
  const { onClickRemove, show, handleClose } = props;

  return (
    <Modal contentClassName='model-remove' backdrop='static' className='modal-removes' centered show={show} onHide={handleClose}>
      <Modal.Body>Are you sure you want to removed?</Modal.Body>
      <div className='model-remove-btns'>
        <Button className='cancel-remove-btn' onClick={handleClose}>
          Cancel
          <MdClose size={15}/>
        </Button>
        <Button className='confirm-remove-btn' onClick={onClickRemove}>
          Remove
          <MdDelete size={15}/>
        </Button>
      </div>
    </Modal>
  );
};

export default RemoveConfModal;
