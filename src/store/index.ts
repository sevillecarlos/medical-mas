import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import appointmentSlice from "./slices/appointments";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    appointment: appointmentSlice.reducer,
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
