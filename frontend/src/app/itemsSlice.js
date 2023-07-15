import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItemsList } from "../services/item";
// import { removeError, addError } from "./errorSlice";

const initialState = {
  items: {},
  status: "idle",
};

export const fetchItemsAction = createAsyncThunk(
  "items/fetchItems",
  async (thunkAPI) => {
    try {
      const itemsList = await getItemsList();
      // thunkAPI.dispatch(removeError());
      const newList = {};
      itemsList.forEach((item) => (newList[item._id] = item));
      return newList;
    } catch (error) {
      const { message } = error;
      // thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItemsAction.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
    builder.addCase(fetchItemsAction.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(fetchItemsAction.pending, (state, action) => {
      state.status = "pending";
    });
  },
});

export default itemsSlice.reducer;
