import React, { useState } from "react";
import { Button, Form, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import RemoveConfModal from "../ui/RemoveConfModal";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { BiMessageRoundedDetail } from "react-icons/bi";

import { AiOutlineEdit } from "react-icons/ai";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

import {
  updateAppointments,
  deleteAppointments,
} from "../store/slices/appointments";
import { useDispatch } from "react-redux";

interface ShowDetailPatient {
  appointmentId: number | null;
  setShowDetailAppointment: (e: any) => void;
  showDetailAppointment: boolean;
  dateAppointmentForm: any;
  appointmentFormDetail: any;
  handleUpdateAppointmentDate: (e: any) => void;
  upDateAppointmentTime: (e: any) => void;
}

const ShowDetailPatientModal = (props: ShowDetailPatient) => {
  const {
    appointmentId,
    setShowDetailAppointment,
    showDetailAppointment,
    dateAppointmentForm,
    upDateAppointmentTime,
    appointmentFormDetail,
    handleUpdateAppointmentDate,
  } = props;

  const dispatch = useDispatch();

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showModifyAppointment, setShowModifyAppointment] = useState(false);

  const modifyAppointment = (e: any) => {
    e.preventDefault();
    dispatch(
      updateAppointments({ ...appointmentFormDetail, id: appointmentId })
    );
    setShowDetailAppointment(false);
    setShowModifyAppointment(false);
  };

  const removeAppointment = () => {
    dispatch(deleteAppointments(appointmentId));
    setShowDetailAppointment(false);
    setShowModifyAppointment(false);
    setShowRemoveModal(false);
  };
  const handleRemoveModalClose = () => {
    setShowRemoveModal(false);
  };
  const handleCloseDetailsAppointment = () => {
    setShowDetailAppointment(false);
    setShowModifyAppointment(false);
  };
  const popoverPatientInfo = (
    <Popover id="popover-patient-info">
      <Popover.Body>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <h5> {dateAppointmentForm.phone_number} </h5>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <h5> {dateAppointmentForm.patient_gender} </h5>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <h5> {dateAppointmentForm.address} </h5>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>BirthDay</Form.Label>
          <h5> {dateAppointmentForm.birth_date} </h5>
        </Form.Group>
      </Popover.Body>
    </Popover>
  );
  return (
    <Modal
      show={showDetailAppointment}
      className="modal-modify-supply"
      onHide={handleCloseDetailsAppointment}
      backdrop="static"
    >
      <RemoveConfModal
        show={showRemoveModal}
        handleClose={handleRemoveModalClose}
        onClickRemove={removeAppointment}
      />
      <Modal.Header closeButton>
        <Modal.Title>Appointment Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={modifyAppointment}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Apppointment Status</Form.Label>
            <div
              className={`status-appointment ${
                dateAppointmentForm.status ? "open" : "close"
              }-status`}
            >
              {dateAppointmentForm.status ? "Open" : "Close"}
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Patient</Form.Label>
            <h5>
              {dateAppointmentForm.first_name} {dateAppointmentForm.last_name}
            </h5>
          </Form.Group>
          {!showModifyAppointment ? (
            <>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Patient Id Number</Form.Label>
                <h5>{dateAppointmentForm.patient_id}</h5>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popoverPatientInfo}
                >
                  <Button className="show-patient-info">
                    {" "}
                    Show patient information <BiMessageRoundedDetail />
                  </Button>
                </OverlayTrigger>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date</Form.Label>
                <h5>{appointmentFormDetail.date}</h5>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Time</Form.Label>
                <h5>{appointmentFormDetail.time}</h5>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Reason</Form.Label>
                <h5>{appointmentFormDetail.reason}</h5>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Created at:</Form.Label>
                <h5>
                  {new Date(dateAppointmentForm.created_at).toLocaleString()}
                </h5>
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date</Form.Label>
                <DatePicker
                  onChange={handleUpdateAppointmentDate}
                  value={appointmentFormDetail.date}
                  className="filter-input patient-form"
                  placeholderText="Enter your appointment date"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Time</Form.Label>
                <TimePicker
                  disableClock
                  className="appointment-time"
                  amPmAriaLabel={"Select am/pm"}
                  onChange={upDateAppointmentTime}
                  value={appointmentFormDetail.time}
                />
              </Form.Group>
            </>
          )}
          {dateAppointmentForm.status ? (
            !showModifyAppointment ? (
              <Button
                onClick={() => setShowModifyAppointment(true)}
                className="edit-btn question"
              >
                Want to modify?
                <AiOutlineEdit style={{ marginLeft: "5px" }} size={20} />
              </Button>
            ) : (
              <>
                <Button type="submit" className="edit-btn">
                  Modify appointment
                  <AiOutlineEdit style={{ marginLeft: "5px" }} size={20} />
                </Button>
                <br />

                <Button
                  onClick={() => setShowRemoveModal(true)}
                  className="remove-btn"
                >
                  Remove appointment
                  <MdDelete style={{ marginLeft: "5px" }} size={20} />
                </Button>
              </>
            )
          ) : null}{" "}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

ShowDetailPatientModal.propTypes = {
  appointmentId: PropTypes.number.isRequired,
  setShowDetailAppointment: PropTypes.func.isRequired,
  showDetailAppointment: PropTypes.bool.isRequired,
  dateAppointmentForm: PropTypes.object.isRequired,
  upDateAppointmentTime: PropTypes.func.isRequired,
  appointmentFormDetail: PropTypes.object.isRequired,
  handleUpdateAppointmentDate: PropTypes.func.isRequired,
};

export default ShowDetailPatientModal;
