import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import TimePicker from "react-time-picker";
import { useDispatch } from "react-redux";
import { createAppointments } from "../store/slices/appointments";

import { AiOutlineUserAdd } from "react-icons/ai";

import DropDownFilter from "../ui/DropDownFilter";

interface AddAppointmentModalI {
  showRegisterAppointment: boolean;
  handleCloseRegisterAppointment: () => void;
  appointment: { patients: Array<number | string> };
}

const AddAppointmentModal = (props: AddAppointmentModalI) => {
  const {
    showRegisterAppointment,
    handleCloseRegisterAppointment,
    appointment,
  } = props;
  const dispatch = useDispatch();

  const [appointmentForm, setAppointmentForm] = useState({
    patient_id: 0,
    date: "",
    time: "",
    reason: "",
    status: true,
  });

  const submitAddAppointment = (e: any) => {
    e.preventDefault();
    setAppointmentForm({
      patient_id: 0,
      date: "",
      time: "",
      reason: "",
      status: true,
    });
    dispatch(createAppointments(appointmentForm));
    handleCloseRegisterAppointment();
  };

  const changeAppointmentForm = (e: any) => {
    setAppointmentForm((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const changeAppointmentTime = (e: any) =>
    setAppointmentForm((prevState: any) => {
      return { ...prevState, time: e };
    });
  const handleChangeAppointmentDate = (date: any) => {
    setAppointmentForm((prevState: any) => {
      const formatDate = new Date(date).toLocaleDateString();

      return { ...prevState, date: formatDate };
    });
  };
  return (
    <Modal
      show={showRegisterAppointment}
      className="modal-add-appointment"
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
              className="date-input patient-form"
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
          <div className="modal-btn-container">
            <Button type="submit" className="add-appointment-btn">
              Add Appointment
              <AiOutlineUserAdd style={{ marginLeft: "5px" }} size={20} />
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddAppointmentModal.propTypes = {
  showRegisterAppointment: PropTypes.bool.isRequired,
  handleCloseRegisterAppointment: PropTypes.func.isRequired,
  appointment: PropTypes.array.isRequired,
};

export default AddAppointmentModal;
