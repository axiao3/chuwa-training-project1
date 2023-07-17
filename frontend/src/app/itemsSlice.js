import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItemsList, getOneItem, getItemsAmount } from "../services/item";
// import { removeError, addError } from "./errorSlice";

const initialState = {
  items: {},
  amount: 0,
  status: "idle",
};

export const fetchItemsAction = createAsyncThunk(
  "items/fetchItems",
  async (data, thunkAPI) => {
    try {
      const { sort, page } = data;
      const itemsList = await getItemsList(sort, page);
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
      console.log("item returned in itemsSlice, fetchoneaction: ",item);
      return item; //fetched 4 times
    } catch (error) {
      const { message } = error;
      // thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getItemsAmountAction = createAsyncThunk(
  "items/getAmount",
  async (thunkAPI) => {
    try {
      const amount = await getItemsAmount();
      // thunkAPI.dispatch(removeError());
      return amount;
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
      //state.items = action.payload;
      state.items = { ...state.items, [action.payload._id]: action.payload };
    });
    builder.addCase(fetchOneItemAction.rejected, (state, action) => {
      state.status = "failed"; //keep or need to change to fetchone failed?
    });
    builder.addCase(fetchOneItemAction.pending, (state, action) => {
      state.status = "pending"; //keep or need to change to fetchone pending?
    });
    //getAmount
    builder.addCase(getItemsAmountAction.fulfilled, (state, action) => {
      state.status = "succeeded"; //keep or need to change to fetchone succeeded?
      state.amount = action.payload;
    });
    builder.addCase(getItemsAmountAction.rejected, (state, action) => {
      state.status = "failed"; //keep or need to change to fetchone failed?
    });
    builder.addCase(getItemsAmountAction.pending, (state, action) => {
      state.status = "pending"; //keep or need to change to fetchone pending?
    });
  },
});

export default itemsSlice.reducer;
