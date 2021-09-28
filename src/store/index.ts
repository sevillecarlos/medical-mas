import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import inventorySlice from "./slices/inventory";
import appointmentSlice from "./slices/appointments";
import medicalRecordsSlice from "./slices/medicalRecords";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    inventory: inventorySlice.reducer,
    appointment: appointmentSlice.reducer,
    medicalRecord: medicalRecordsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
