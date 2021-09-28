import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  patient: null,
  medicalRecords: null,
  reload: false,
  error: null,
  status: "idle",
};

export const getPatient = createAsyncThunk(
  "medical-records/getPatient",
  async (patientId: any) => {
    try {
      const res = axios.get(
        `http://127.0.0.1:5000/api/v1/patients/${patientId}`
      );
      const patients = (await res).data;
      return patients;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getMedicalRecord = createAsyncThunk(
  "medical-records/getMedicalRecord",
  async () => {
    try {
      const res = axios.get(`http://127.0.0.1:5000/api/v1/medical_records`);
      const medicalRecord = (await res).data;
      return medicalRecord;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const createMedicalRecord = createAsyncThunk(
  "medical-records/createMedicalRecord",
  async (medical_record_info: any) => {
    try {
      const res = axios.post(
        `http://127.0.0.1:5000/api/v1/medical_records`,
        medical_record_info
      );
      const medicalRecord = (await res).data;
      return medicalRecord;
    } catch (error) {
      return error.response.data;
    }
  }
);

const medicalRecordsSlice = createSlice({
  name: "medical-record",
  initialState,
  reducers: {
    clearReload(state) {
      state.reload = false;
    },
    clearPatient(state) {
      state.patient = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPatient.fulfilled, (state, action: { payload: any }) => {
      state.status = "success";
      state.patient = action.payload;
    });
    builder.addCase(getPatient.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getPatient.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(
      createMedicalRecord.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.reload = action.payload;
      }
    );
    builder.addCase(createMedicalRecord.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(createMedicalRecord.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(
      getMedicalRecord.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.medicalRecords = action.payload;
      }
    );
    builder.addCase(getMedicalRecord.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getMedicalRecord.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const medicalRecordsAction = medicalRecordsSlice.actions;
export default medicalRecordsSlice;
