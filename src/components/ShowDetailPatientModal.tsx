import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import RemoveConfModal from "../ui/RemoveConfModal";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

import {
  updateAppointments,
  deleteAppointments,
} from "../store/slices/appointments";
import { useDispatch } from "react-redux";

interface ShowDetailPatient {
  appointmentForm: object;
  appointmentId: number|null;
  setShowDetailAppointment: (e: any) => void;
  submitAddAppointment: (e: any) => void;
  showDetailAppointment: boolean;
  dateAppointmentForm: any;
  appointmentFormDetail: any;
  patientName: string;
  handleChangeAppointmentDate: (e: any) => void;
  changeAppointmentTime: (e: any) => void;
  changeAppointmentForm: (e: any) => void;
}

const ShowDetailPatientModal = (props: ShowDetailPatient) => {
  const {
    appointmentForm,
    appointmentId,
    setShowDetailAppointment,
    showDetailAppointment,
    dateAppointmentForm,
    patientName,
    changeAppointmentTime,
    submitAddAppointment,
    appointmentFormDetail,
    handleChangeAppointmentDate,
    changeAppointmentForm,
  } = props;

  const dispatch = useDispatch();

  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const [showModifyAppointment, setShowModifyAppointment] = useState(false);
  const modifyAppointment = (e: any) => {
    e.preventDefault();
    dispatch(updateAppointments({ ...appointmentForm, id: appointmentId }));
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
        <Form onSubmit={submitAddAppointment} autoComplete="off">
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
            <h5>{patientName}</h5>
          </Form.Group>
          {!showModifyAppointment ? (
            <>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Patient Id Number</Form.Label>
                <h5>{dateAppointmentForm.patient_id_number}</h5>
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
                <h5>{dateAppointmentForm.created_at}</h5>
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date</Form.Label>
                <DatePicker
                  onChange={handleChangeAppointmentDate}
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
                  onChange={changeAppointmentTime}
                  value={appointmentFormDetail.time}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={changeAppointmentForm}
                  className="form-input-add-supply"
                  placeholder="Enter a reason of the appointment"
                  name="reason"
                  value={appointmentFormDetail.reason}
                  style={{ height: "90px" }}
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
                <Button onClick={modifyAppointment} className="edit-btn">
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
  appointmentForm: PropTypes.object.isRequired,
  appointmentId: PropTypes.number.isRequired,
  setShowDetailAppointment: PropTypes.func.isRequired,
  showDetailAppointment: PropTypes.bool.isRequired,
  dateAppointmentForm: PropTypes.object.isRequired,
  patientName: PropTypes.string.isRequired,
  changeAppointmentTime: PropTypes.func.isRequired,
  submitAddAppointment: PropTypes.func.isRequired,
  appointmentFormDetail: PropTypes.object.isRequired,
  handleChangeAppointmentDate: PropTypes.func.isRequired,
  changeAppointmentForm: PropTypes.func.isRequired,
};

export default ShowDetailPatientModal;
