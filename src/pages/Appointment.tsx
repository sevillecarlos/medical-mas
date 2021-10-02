import React, { useState, useEffect } from "react";
import { Table, Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { GrFormAdd } from "react-icons/gr";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import DatePicker from "react-datepicker";
import { BsFillUnlockFill, BsFillLockFill } from "react-icons/bs";
import { HiOutlineColorSwatch } from "react-icons/hi";

import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
//MODALS
import RegisterPatientModal from "../components/RegisterPatientModal";
import ShowDetailPatientModal from "../components/ShowDetailPatientModal";
import AddAppointmentModal from "../components/AddAppointmentModal";

import {
  getPatients,
  appointmentAction,
  getAppointments,
  updateAppointmentStatus,
} from "../store/slices/appointments";

import "react-datepicker/dist/react-datepicker.css";
import "./style/Appointments.css";

import AlertModal from "../ui/AlertModal";

const todayDate = new Date().toLocaleDateString();
const Appointment = () => {
  const dispatch = useDispatch();

  const appointment = useSelector((state: RootStateOrAny) => state.appointment);

  const handleUpdateAppointmentDate = (date: string) => {
    setAppointmentFormDetail((prevState: any) => {
      const formatDate = new Date(date).toLocaleDateString();

      return { ...prevState, date: formatDate };
    });
  };

  const [showRegisterPatients, setShowRegisterPatients] = useState(false);

  const [showRegisterAppointment, setShowRegisterAppointment] = useState(false);
  const [showDetailAppointment, setShowDetailAppointment] = useState(false);

  const handleCloseRegisterPatients = () => setShowRegisterPatients(false);

  const handleCloseRegisterAppointment = () =>
    setShowRegisterAppointment(false);

  const [appointmentId, setAppointmentId] = useState(null);

  const [appointmentFormDetail, setAppointmentFormDetail] = useState({
    patient_id: 0,
    date: "",
    time: "",
    reason: "",
    status: true,
  });

  const [dateAppointmentForm, setDateAppointmentForm] = useState({});

  const [appointmentList, setAppointmentList] = useState(Array<any>());

  const statusFilter = (e?: any) => {
    const filterValue = e?.target.value ? e.target.value : 1;
    const filterAppoinmentArr = appointment.appointments.filter(
      (appointment: { status: boolean }) => {
        return appointment.status == filterValue;
      }
    );

    const orderByDate = filterAppoinmentArr.sort(
      (a: { date: string }, b: { date: string }) =>
        new Date(b.date).valueOf() - new Date(a.date).valueOf()
    );
    setAppointmentList(orderByDate);
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

  const getPatientName = (id: number) => {
    const name = appointment.patients?.filter(
      (v: any) => Number(v.id) === Number(id)
    )[0];

    return `${name?.first_name} ${name?.last_name}`;
  };

  const upDateAppointmentTime = (e: any) =>
    setAppointmentFormDetail((prevState: any) => {
      return { ...prevState, time: e };
    });

  const getPatient = (patientId: number) => {
    const patient = appointment.patients?.filter(
      (v: any) => v.id === patientId
    );

    return patient[0];
  };

  const showDetail = (appointmentData: any) => {
    setShowDetailAppointment(true);
    const { patient_id, reason, date, time, created_at, id, status } =
      appointmentData;
    setAppointmentId(id);
    const patientInfo = getPatient(patient_id);
    setDateAppointmentForm({
      created_at: new Date(created_at).toLocaleDateString(),
      ...patientInfo,
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

  const [filterDate, setFilterDate] = useState(null);

  const handleChangeFilterDate = (date: any) => {
    // setFilterDate(date);
    // const formatDate = new Date(date).toLocaleDateString();
    // const filterDateAppointments = appointmentList.filter(
    //   (v: any) => v.date === formatDate
    // );
    // setAppointmentList(filterDateAppointments);
  };

  const popoverMapKey = (
    <Popover id="popover-color-map-key">
      <Popover.Body>
        <p>Appointment Date </p>
        <span className="appointment-remainder soon">SOON </span>
        <span className="appointment-remainder today">TODAY </span>
        <span className="appointment-remainder late">LATE </span>
      </Popover.Body>
    </Popover>
  );
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

      <RegisterPatientModal
        handleCloseRegisterPatients={handleCloseRegisterPatients}
        showRegisterPatients={showRegisterPatients}
      />

      <ShowDetailPatientModal
        appointmentId={appointmentId}
        setShowDetailAppointment={setShowDetailAppointment}
        showDetailAppointment={showDetailAppointment}
        dateAppointmentForm={dateAppointmentForm}
        upDateAppointmentTime={upDateAppointmentTime}
        appointmentFormDetail={appointmentFormDetail}
        handleUpdateAppointmentDate={handleUpdateAppointmentDate}
      />

      <AddAppointmentModal
        showRegisterAppointment={showRegisterAppointment}
        handleCloseRegisterAppointment={handleCloseRegisterAppointment}
        appointment={appointment}
      />

      <Table borderless hover responsive className="appointment-table">
        <thead>
          <tr>
            <th>
              <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={popoverMapKey}
              >
                <Button className="color-key-btn table-btn">
                  {" "}
                  Color Key <HiOutlineColorSwatch />
                </Button>
              </OverlayTrigger>
            </th>
            <th>
              {" "}
              <Button
                className="add-patients table-btn"
                onClick={() => setShowRegisterPatients(true)}
              >
                Register Patients
                <AiOutlineUserAdd />
              </Button>
            </th>
            <th>
              {" "}
              <Button
                className="add-appointment table-btn"
                onClick={() => setShowRegisterAppointment(true)}
              >
                Register Appointments
                <GrFormAdd />
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
                <option value={1}>Open </option>
                <option value={0}>Close </option>
              </Form.Select>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="sub-header-inventory-table">
            <td>Date</td>
            <td>Time</td>
            <td>Patient Name</td>
            <td>More Info</td>
            <td>Appointment Status</td>
          </tr>
          {appointmentList.map((v: any) => {
            return (
              <tr key={v.id}>
                <td className="date-column">
                  <span
                    className={`${
                      v.date === todayDate
                        ? "appointment-remainder today"
                        : "" || new Date(v.date) < new Date(todayDate)
                        ? "appointment-remainder late"
                        : "" || new Date(v.date) > new Date(todayDate)
                        ? "appointment-remainder soon"
                        : ""
                    } `}
                  >
                    {v.date}{" "}
                  </span>
                </td>
                <td>{v.time}</td>
                <td>{getPatientName(v.patient_id)}</td>

                <td>
                  <div>
                    <Button
                      className="show-detail-btn table-btn"
                      onClick={() => showDetail(v)}
                    >
                      Detail <BiCommentDetail />
                    </Button>
                  </div>
                </td>
                <td>
                  {" "}
                  <Button
                    onClick={(e) => modifyAppointmentStatus(e, v.id, v.status)}
                    className={`${
                      v.status ? "close-btn" : "open-btn"
                    } table-btn`}
                  >
                    {v.status ? (
                      <span>
                        Close <BsFillLockFill />
                      </span>
                    ) : (
                      <span>
                        Open <BsFillUnlockFill />
                      </span>
                    )}{" "}
                  </Button>
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
