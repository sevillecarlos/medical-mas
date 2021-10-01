import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import TimePicker from "react-time-picker";

import { AiOutlineUserAdd } from "react-icons/ai";

import DropDownFilter from "../ui/DropDownFilter";

interface AddAppointmentModalI {
  showRegisterAppointment: boolean;
  handleCloseRegisterAppointment: () => void;
  submitAddAppointment: (e: any) => void;
  handleChangeAppointmentDate: (e: any) => void;
  changeAppointmentForm: (e: any) => void;
  changeAppointmentTime: (e: any) => void;
  appointment: any;
  appointmentForm: any;
  setAppointmentForm: (e: any) => void;
}

const AddAppointmentModal = (props: AddAppointmentModalI) => {
  const {
    showRegisterAppointment,
    handleCloseRegisterAppointment,
    submitAddAppointment,
    handleChangeAppointmentDate,
    changeAppointmentForm,
    changeAppointmentTime,
    appointment,
    appointmentForm,
    setAppointmentForm,
  } = props;

  return (
    <Modal
      show={showRegisterAppointment}
      className="modal-modify-supply"
      onHide={handleCloseRegisterAppointment}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitAddAppointment} autoComplete="off">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Patient</Form.Label>
            <DropDownFilter
              items={appointment.patients}
              appointmentFormPatient={setAppointmentForm}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Date</Form.Label>
            <DatePicker
              onChange={handleChangeAppointmentDate}
              value={appointmentForm.date}
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
              value={appointmentForm.time}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              as="textarea"
              onChange={changeAppointmentForm}
              value={appointmentForm.reason}
              className="form-input-add-supply"
              placeholder="Enter a reason of the appointment"
              name="reason"
              style={{ height: "100px" }}
            />
          </Form.Group>

          <Button type="submit" className="add-appointment-btn">
            Add Appointment
            <AiOutlineUserAdd style={{ marginLeft: "5px" }} size={20} />
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddAppointmentModal.propTypes = {
  showRegisterAppointment: PropTypes.bool.isRequired,
  // handleCloseRegisterAppointment: () => void;
  // submitAddAppointment: (e: any) => void;
  // handleChangeAppointmentDate: (e: any) => void;
  // changeAppointmentForm: (e: any) => void;
  // changeAppointmentTime: (e: any) => void;
  // appointment: any;
  // appointmentForm: any;
  // setAppointmentForm: (e: any) => void;
};

export default AddAppointmentModal;
