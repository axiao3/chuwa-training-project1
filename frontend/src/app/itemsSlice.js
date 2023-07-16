import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItemsList, getOneItem } from "../services/item";
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

//fetchOneItemAction "items/fetchOneItem"
export const fetchOneItemAction = createAsyncThunk(
  "items/fetchOneItem",
  async (data, thunkAPI) => {
    try {
      const item = await getOneItem(data); //where to get object id?
      // thunkAPI.dispatch(removeError());
      console.log("item returned in itemsSlice, fetchoneaction: ");
      console.log(item);
      return item; //fetched 4 times
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
  reducers: {},
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
    //fetchOne
    builder.addCase(fetchOneItemAction.fulfilled, (state, action) => {
      state.status = "succeeded"; //keep or need to change to fetchone succeeded?
      state.items = action.payload;
    });
    builder.addCase(fetchOneItemAction.rejected, (state, action) => {
      state.status = "failed"; //keep or need to change to fetchone failed?
    });
    builder.addCase(fetchOneItemAction.pending, (state, action) => {
      state.status = "pending"; //keep or need to change to fetchone pending?
    });
  },
});

export default itemsSlice.reducer;
