import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { register, login, isLoggedIn, showUser } from "../api/auth";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials, thunkAPI) => {
    try {
      await register(credentials);
      return {};
    } catch (err) {
      throw err;
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const res = await login(credentials);
      return {
        user: res,
        isAuthenticated: true,
      };
    } catch (err) {
      throw err;
    }
  }
);

export const checkLoggedIn = createAsyncThunk(
  "auth/checkLoggedIn",
  async () => {
    try {
      const res = await isLoggedIn();
      return {
        user: res.user,
        isAuthenticated: true,
        cart: res.cart,
      };
    } catch (err) {
      throw err;
    }
  }
);

export const show = createAsyncThunk(
  "auth/show",
  async () => {
    try {
      const res = await showUser();
      const data = res.json()
      return data
    } catch (err) {
      throw err;
    }
  }
);

const initialState = {
  data: [],
  status: "idle",
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failure";
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failure";
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(checkLoggedIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(show.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload
      });
  },
});

export default authSlice.reducer;
