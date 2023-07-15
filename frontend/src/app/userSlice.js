import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { removeError, addError } from "./errorSlice";

import { signIn, signUp, logOut } from "../services/auth";

const initialState = {
  user: {},
  status: "idle",
};

export const signUpAction = createAsyncThunk(
  "user/signUp",
  async (data, thunkAPI) => {
    try {
      const { email, password, userType } = data;
      console.log(555, data);
      const user = await signUp(email, password, userType);
      // thunkAPI.dispatch(removeError());
      return user;
    } catch (error) {
      const { message } = error;
      // thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signInAction = createAsyncThunk(
  "user/signIn",
  async (data, thunkAPI) => {
    try {
      const { email, password } = data;
      const user = await signIn(email, password);
      // thunkAPI.dispatch(removeError());
      return user;
    } catch (error) {
      const { message } = error;
      // thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logOutAction = createAsyncThunk(
  "user/logOut",
  async (data, thunkAPI) => {
    try {
      const { email, token } = data;
      const user = logOut(email, token);
      // thunkAPI.dispatch(removeError());
      return user;
    } catch (error) {
      const { message } = error;
      // thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpAction.fulfilled, (state, action) => {
      state.status = "Sign up succeeded";
    });
    builder.addCase(signUpAction.rejected, (state, action) => {
      state.status = action.payload;
    });
    builder.addCase(signUpAction.pending, (state, action) => {
      state.status = "Sign up pending";
    });
    builder.addCase(signInAction.fulfilled, (state, action) => {
      state.status = "Sign in succeeded";
      state.user = action.payload;
    });
    builder.addCase(signInAction.rejected, (state, action) => {
      state.status = action.payload;
    });
    builder.addCase(signInAction.pending, (state, action) => {
      state.status = "Sign in pending";
    });
    builder.addCase(logOutAction.fulfilled, (state, action) => {
      state.status = "Log out succeeded";
      state.user = {};
    });
    builder.addCase(logOutAction.rejected, (state, action) => {
      state.status = action.payload;
    });
    builder.addCase(logOutAction.pending, (state, action) => {
      state.status = "pending";
    });
  },
});

export default userSlice.reducer;
