import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  patients: Array<any>(),
  appointments: Array<any>(),
  msg: "",
  reload: false,
  error: null,
  status: "idle",
};

export const getPatients = createAsyncThunk("auth/getPatient", async () => {
  try {
    const res = axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/patients`
    );
    const patients = (await res).data;
    return patients;
  } catch (error) {
    return error.response.data;
  }
});

export const createPatient = createAsyncThunk(
  "auth/createPatient",
  async (patientsData: any) => {
    try {
      const res = axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/patients`,
        patientsData
      );
      const patients = (await res).data;
      return patients;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getAppointments = createAsyncThunk(
  "auth/getAppointments",
  async () => {
    try {
      const res = axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/appointments`
      );
      const appointments = (await res).data;
      return appointments;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const createAppointments = createAsyncThunk(
  "auth/createAppointments",
  async (appointmentsData: any) => {
    try {
      const res = axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/appointments`,
        appointmentsData
      );
      const appointments = (await res).data;
      return appointments;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateAppointments = createAsyncThunk(
  "auth/updateAppointments",
  async (appointmentsData: any) => {
    try {
      const res = axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/appointments/${appointmentsData.id}`,
        {
          date: appointmentsData.date,
          time: appointmentsData.time,
          reason: appointmentsData.reason,
        }
      );
      const appointments = (await res).data;
      return appointments;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  "auth/updateAppointmentStatus",
  async (appointmentsData: any) => {
    try {
      console.log(appointmentsData);
      const res = axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/appointments/${appointmentsData.id}`,
        {
          status: appointmentsData.status,
        }
      );
      const appointments = (await res).data;
      return appointments;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const deleteAppointments = createAsyncThunk(
  "auth/deleteAppointments",
  async (id: any) => {
    try {
      const res = axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/appointments/${id}`
      );
      const appointments = (await res).data;
      return appointments;
    } catch (error) {
      return error.response.data;
    }
  }
);
const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearReload(state) {
      state.reload = false;
    },
    clearMsg(state) {
      state.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getPatients.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.patients = action.payload;
      }
    );
    builder.addCase(getPatients.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getPatients.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(
      createPatient.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.msg = action.payload.reason;
      }
    );
    builder.addCase(createPatient.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(createPatient.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(
      getAppointments.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.appointments = action.payload;
      }
    );
    builder.addCase(getAppointments.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getAppointments.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(
      createAppointments.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.reload = action.payload;
      }
    );
    builder.addCase(createAppointments.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(createAppointments.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(
      updateAppointments.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.reload = action.payload;
      }
    );
    builder.addCase(updateAppointments.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updateAppointments.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(
      updateAppointmentStatus.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.reload = action.payload;
      }
    );
    builder.addCase(updateAppointmentStatus.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updateAppointmentStatus.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(
      deleteAppointments.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.reload = action.payload;
      }
    );
    builder.addCase(deleteAppointments.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteAppointments.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const appointmentAction = appointmentSlice.actions;
export default appointmentSlice;
