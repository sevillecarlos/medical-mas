import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  FormControl,
  Form,
  Modal,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { GrFormAdd } from "react-icons/gr";
import { AiOutlineEdit, AiOutlineUserAdd } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import DatePicker from "react-datepicker";
import { BsFillUnlockFill, BsFillLockFill } from "react-icons/bs";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import DropDownFilter from "../ui/DropDownFilter";
import { MdDelete } from "react-icons/md";

import TimePicker from "react-time-picker";

import RemoveConfModal from "../ui/RemoveConfModal";

import {
  getPatients,
  appointmentAction,
  createPatient,
  getAppointments,
  createAppointments,
  updateAppointments,
  deleteAppointments,
  updateAppointmentStatus,
} from "../store/slices/appointments";

import "react-datepicker/dist/react-datepicker.css";
import "./style/Appointments.css";

import AlertModal from "../ui/AlertModal";

const Appointment = () => {
  const dispatch = useDispatch();

  const appointment = useSelector((state: RootStateOrAny) => state.appointment);

  const handleChangePatientDate = (date: any) =>
    setPatientForm((prevState: any) => {
      const formatDate = new Date(date).toLocaleDateString();
      return { ...prevState, birth_date: formatDate };
    });

  const handleChangeAppointmentDate = (date: any) => {
    setAppointmentForm((prevState: any) => {
      const formatDate = new Date(date).toLocaleDateString();

      return { ...prevState, date: formatDate };
    });
  };

  const [showRegisterPatients, setShowRegisterPatients] = useState(false);

  const [showRegisterAppointment, setShowRegisterAppointment] = useState(false);

  const [showDetailAppointment, setShowDetailAppointment] = useState(false);

  const [showModifyAppointment, setShowModifyAppointment] = useState(false);

  const handleCloseRegisterPatients = () => setShowRegisterPatients(false);

  const handleCloseRegisterAppointment = () =>
    setShowRegisterAppointment(false);

  const handleCloseDetailsAppointment = () => {
    setShowDetailAppointment(false);
    setShowModifyAppointment(false);
  };

  const [appointmentId, setAppointmentId] = useState(null);

  const handleRemoveModalClose = () => {
    setShowRemoveModal(false);
  };

  const [patientForm, setPatientForm] = useState({
    patient_id: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    patient_gender: "",
    phone_number: "",
    address: "",
  });

  const [appointmentForm, setAppointmentForm] = useState({
    patient_id: 0,
    date: "",
    time: "",
    reason: "",
    status: true,
  });

  const [appointmentFormDetail, setAppointmentFormDetail] = useState({
    patient_id: 0,
    date: "",
    time: "",
    reason: "",
    status: true,
  });

  const [dateAppointmentForm, setDateAppointmentForm] = useState({
    created_at: "",
    patient_id_number: "",
    status: false,
  });

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [appointmentList, setAppointmentList] = useState(Array<any>());

  const changePatientForm = (e: any) =>
    setPatientForm((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });

  const statusFilter = (e?: any) => {
    const filterValue = e?.target.value ? e.target.value : 1;
    const filterAppoinmentArr = appointment.appointments.filter(
      (appointment: { status: boolean }) => {
        return appointment.status == filterValue;
      }
    );

    setAppointmentList(filterAppoinmentArr);
  };

  useEffect(() => {
    dispatch(getPatients());
    dispatch(getAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (appointment.appointments) {
      setAppointmentList(appointment.appointments);
      statusFilter();
    }
  }, [appointment.appointments]);

  useEffect(() => {
    if (appointment.msg) {
      dispatch(getPatients());
      setTimeout(() => {
        dispatch(appointmentAction?.clearMsg());
      }, 3000);
    }
  }, [appointment.msg, dispatch]);

  useEffect(() => {
    if (appointment.reload) {
      dispatch(getAppointments());
      dispatch(appointmentAction.clearReload());
    }
  }, [appointment.reload, dispatch]);

  const submitAddPatient = (e: any) => {
    e.preventDefault();
    dispatch(createPatient(patientForm));
    handleCloseRegisterPatients();
  };

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

  const getPatientName = (id: number) => {
    const name = appointment.patients?.filter(
      (v: any) => Number(v.id) === Number(id)
    )[0];

    return `${name?.first_name} ${name?.last_name}`;
  };

  const changeAppointmentTime = (e: any) =>
    setAppointmentForm((prevState: any) => {
      return { ...prevState, time: e };
    });

  const getPatientIdNumber = (patientId: any) => {
    const idPatientNumber = appointment.patients?.filter(
      (v: any) => v.id === patientId
    )[0];

    return idPatientNumber?.patient_id;
  };

  const showDetail = (appointmentData: any) => {
    setShowDetailAppointment(true);
    const { patient_id, reason, date, time, created_at, id, status } =
      appointmentData;
    setAppointmentId(id);
    setDateAppointmentForm({
      created_at: new Date(created_at).toLocaleDateString(),
      patient_id_number: getPatientIdNumber(patient_id),
      status,
    });
    setAppointmentFormDetail({
      patient_id,
      reason,
      date,
      time,
      status: true,
    });
  };

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

  const [filterDate, setFilterDate] = useState(null);

  const handleChangeFilterDate = (date: any) => {
    setFilterDate(date); //fix the bug
    statusFilter()
    const formatDate = new Date(date).toLocaleDateString();

    const filterDateAppointments = appointmentList.filter(
      (v: any) => v.date === formatDate
    );

    setAppointmentList(
      filterDateAppointments.length !== 0 ? filterDateAppointments : appointmentList
    );

  };

  const modifyAppointmentStatus = (e: any, id: any, status: any) => {
    e.preventDefault();
    dispatch(updateAppointmentStatus({ status: !status, id }));
  };
  return (
    <div className="appointments">
      <AlertModal
        showCondition={appointment.msg !== ""}
        msg={appointment.msg}
      />

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
              <h5>{getPatientName(appointmentFormDetail.patient_id)}</h5>
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
      <Table borderless hover className="inventory-table">
        <thead>
          <tr>
            <th>
              {" "}
              <Button
                className="add-appointment"
                onClick={() => setShowRegisterAppointment(true)}
              >
                Register Appointements
                <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
              </Button>
            </th>
            <th>
              {" "}
              <Button
                className="add-patients"
                onClick={() => setShowRegisterPatients(true)}
              >
                Register Patients
                <AiOutlineUserAdd style={{ marginLeft: "5px" }} size={20} />
              </Button>
            </th>
            <th>
              <DatePicker
                selected={filterDate}
                onChange={handleChangeFilterDate}
                className="filter-input date-filter"
                placeholderText="Select date to filter"
              />
            </th>
            <th>
              <Form.Select
                onChange={statusFilter}
                className="filter-input status-filter"
              >
                <option value={1}>Open Appointments</option>
                <option value={0}>Close Appointments </option>
              </Form.Select>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="sub-header-inventory-table">
            <td>Patient Name</td>
            <td>Appointment Date</td>
            <td>Appointment Time</td>
            <td>More Info</td>
            <td>Action</td>
          </tr>
          {appointmentList.map((v: any) => {
            return (
              <tr key={v.id}>
                <td>{getPatientName(v.patient_id)}</td>
                <td>{v.date}</td>
                <td>{v.time}</td>
                <td>
                  <div>
                    <Button
                      className="show-detail-btn"
                      onClick={() => showDetail(v)}
                    >
                      Show Detail <BiCommentDetail />
                    </Button>
                  </div>
                </td>
                <td>
                  <div>
                    {" "}
                    <Button
                      onClick={(e) =>
                        modifyAppointmentStatus(e, v.id, v.status)
                      }
                      className={v.status ? "close-btn" : "open-btn"}
                    >
                      {v.status ? (
                        <span>
                          Close Appointment <BsFillLockFill size={20} />
                        </span>
                      ) : (
                        <span>
                          Open Appointment <BsFillUnlockFill size={20} />
                        </span>
                      )}{" "}
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Appointment;
