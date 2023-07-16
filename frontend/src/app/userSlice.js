import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { removeError, addError } from "./errorSlice";
import { signIn, signUp, logOut } from "../services/auth";

const initialState = {
  isAuthenticated: false,
  user: {},
  status: "idle",
};

export const signUpAction = createAsyncThunk(
  "user/signUp",
  async (data, thunkAPI) => {
    try {
      const { email, password, userType } = data;
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

      if (user.email && user.token) localStorage.setItem("token", user.token);

      // thunkAPI.dispatch(removeError());
      console.log("sign in in user slice: ", user);
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
  reducers: {
    setCurrentUser: (state, action) => {
      state.isAuthenticated = !!Object.keys(action.payload).length;
      state.user = action.payload;
    },
    logOutUser: (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.status = "idle";
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpAction.fulfilled, (state, action) => {
      state.status = "Sign up succeeded";
    });
    builder.addCase(signUpAction.rejected, (state, action) => {
      state.status = action.payload; //error message
    });
    builder.addCase(signUpAction.pending, (state, action) => {
      state.status = "Sign up pending";
    });
    builder.addCase(signInAction.fulfilled, (state, action) => {
      state.isAuthenticated = !!Object.keys(action.payload).length;
      state.user = action.payload;
      state.status = "Sign in succeeded";
    });
    builder.addCase(signInAction.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.status = action.payload;
    });
    builder.addCase(signInAction.pending, (state, action) => {
      state.status = "Sign in pending";
    });
  },
});

export const { setCurrentUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
