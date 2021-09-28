import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  token: null,
  error: null,
  msg: "",
  status: "idle",
  reload: false,
  usernames: Array<any>(),
};

export const fetchSignIn = createAsyncThunk(
  "auth/fetchSignIn",
  async (signInForm: any) => {
    try {
      const res = axios.post(
        "http://127.0.0.1:5000/api/v1/sessions",
        signInForm
      );
      const token = (await res).data;
      return token;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  try {
    const res = axios.get("http://127.0.0.1:5000/api/v1/users");
    const user = (await res).data;
    return user;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async (signUpForm: any) => {
    try {
      const res = axios.post("http://127.0.0.1:5000/api/v1/users", signUpForm);
      const user = (await res).data;
      return user;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData: any) => {
    try {
      const res = axios.put(
        `http://127.0.0.1:5000/api/v1/users/${userData.id}`,
        {
          first_name: userData.first_name,
          last_name: userData.last_name,
          username: userData.username,
          password: userData.password,
        }
      );

      const user = (await res).data;
      return user;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const deleteUser = createAsyncThunk(
  "auth/removeUser",
  async (id: any) => {
    try {
      const res = axios.delete(`http://127.0.0.1:5000/api/v1/users/${id}`);

      const user = (await res).data;
      return user;
    } catch (error) {
      return error.response.data;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearReload(state) {
      state.reload = false;
    },
    clearToken(state) {
      localStorage.removeItem("@$token");
      state.token = null;
    },
    clearMsg(state) {
      state.msg = "";
    },
    getToken(state) {
      const token: any = localStorage.getItem("@$token");
      state.token = token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchSignIn.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        if (action.payload?.token) {
          localStorage.setItem("@$token", action.payload.token);
          state.token = action.payload.token;
        } else {
          state.error = null;
          state.error = action.payload?.reason;
        }
      }
    );
    builder.addCase(fetchSignIn.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchSignIn.rejected, (state, action: { payload: any }) => {
      state.status = "reject";
    });

    builder.addCase(fetchUsers.fulfilled, (state, action: { payload: any }) => {
      state.status = "success";
      state.usernames = action.payload;
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.rejected, (state, action: { payload: any }) => {
      state.status = "reject";
    });

    builder.addCase(
      fetchSignUp.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.msg = action.payload.reason;
        state.reload = true;
      }
    );
    builder.addCase(fetchSignUp.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchSignUp.rejected, (state, action: { payload: any }) => {
      state.status = "reject";
    });

    builder.addCase(updateUser.fulfilled, (state, action: { payload: any }) => {
      state.status = "success";
      state.reload = action.payload;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updateUser.rejected, (state, action: { payload: any }) => {
      state.status = "reject";
    });

    builder.addCase(deleteUser.fulfilled, (state, action: { payload: any }) => {
      state.status = "success";
      state.reload = action.payload;
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteUser.rejected, (state, action: { payload: any }) => {
      state.status = "reject";
    });
  },
});

export const authAction = authSlice.actions;
export default authSlice;
