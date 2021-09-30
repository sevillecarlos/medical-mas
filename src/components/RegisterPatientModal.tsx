import React from "react";
import { Button, FormControl, Form, Modal, InputGroup } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import DatePicker from "react-datepicker";

import PropTypes from "prop-types";

interface RegisterPatient {
  submitAddPatient: (e:any) => void;
  handleCloseRegisterPatients: () => void;
  handleChangePatientDate: (date:any) => void;
  changePatientForm: (e:any) => void;
  patientForm: { birth_date: string };
  showRegisterPatients: boolean;
}

const RegisterPatientModal = (props: RegisterPatient) => {
  const {
    submitAddPatient,
    handleCloseRegisterPatients,
    showRegisterPatients,
    handleChangePatientDate,
    changePatientForm,
    patientForm,
  } = props;
  return (
    <div>
      <Modal
        show={showRegisterPatients}
        className="modal-modify-supply"
        onHide={handleCloseRegisterPatients}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Register Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitAddPatient} autoComplete="off">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ID Number</Form.Label>
              <Form.Control
                className="form-input-add-supply"
                type="text"
                onChange={changePatientForm}
                name="patient_id"
                placeholder="Enter patient ID"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className="form-input-add-supply"
                type="text"
                onChange={changePatientForm}
                name="first_name"
                placeholder="Enter first name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                className="form-input-add-supply"
                type="text"
                onChange={changePatientForm}
                name="last_name"
                placeholder="Enter last name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Birth Date</Form.Label>
              <DatePicker
                onChange={handleChangePatientDate}
                value={patientForm.birth_date}
                className="filter-input patient-form"
                placeholderText="Enter your birth day"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Select Gender</Form.Label>
              <Form.Select
                className="form-input-add-supply"
                onChange={changePatientForm}
                name="patient_gender"
                required={true}
              >
                <option>Select your gender</option>
                <option>Female</option>
                <option>Male</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text className="text-phone-number">
                  +
                </InputGroup.Text>
                <FormControl
                  placeholder="Enter your phone number"
                  className="form-input-phone"
                  name="phone_number"
                  onChange={changePatientForm}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                onChange={changePatientForm}
                className="form-input-add-supply"
                placeholder="Enter a detail of the item"
                name="address"
                style={{ height: "90px" }}
              />
            </Form.Group>
            <Button type="submit" className="add-patient-btn">
              Add Patient
              <AiOutlineUserAdd style={{ marginLeft: "5px" }} size={20} />
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

RegisterPatientModal.propTypes = {
  submitAddPatient: PropTypes.func.isRequired,
  handleCloseRegisterPatients: PropTypes.func.isRequired,
  showRegisterPatients: PropTypes.bool.isRequired,
  handleChangePatientDate: PropTypes.func.isRequired,
  changePatientForm: PropTypes.func.isRequired,
  patientForm: PropTypes.object.isRequired,
};

export default RegisterPatientModal;
