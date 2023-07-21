/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart, cartDecrement, cartIncrement } from "../services/cart";
// import { removeError, addError } from "./errorSlice";

const initialState = {
  cart: {},   // {{id: {}}, {id: {}}, {id: {}}}
  status: "idle",
  totalPrice: 0,
};

export const fetchCartAction = createAsyncThunk(
  "carts/fetchCart",
  async (thunkAPI) => {
    try {
      const cart = await getCart();
      // thunkAPI.dispatch(removeError());
      const newList = {};
      let totalPrice = 0;
      cart.forEach((item) => {
        totalPrice += Number(item.price) * item.quantity;
        newList[item.item] = item;
      });

      return { cart: newList, totalPrice: (totalPrice == "-0") ? 0 : totalPrice};
    } catch (error) {
      const { message } = error;
      // thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cartIncrementAction = createAsyncThunk(
  "carts/increment",
  async (data, thunkAPI) => {
    try {
      const { itemId, quantity } = data;
      const addedItem = await cartIncrement(itemId, quantity);
      const addedPrice = quantity * addedItem.price;

      return {
        itemId: itemId,
        addedItem: addedItem,
        addedPrice: addedPrice,
      };
    } catch (error) {
      const { message } = error;
      // thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cartDecrementAction = createAsyncThunk(
  "carts/decrement",
  async (data, thunkAPI) => {
    try {
      const { itemId, quantity } = data;
      let reducedItem = await cartDecrement(itemId, quantity);

      const originalCart = thunkAPI.getState().cart.cart;
      const updatedCart = { ...originalCart };
 
      if (reducedItem.quantity <= 0) {
        delete updatedCart[itemId];
      } else {
        updatedCart[itemId] = reducedItem;
      }

      const reducedPrice = quantity * reducedItem.price;

      return {
        cart: updatedCart,
        reducedPrice: reducedPrice,
      };
    } catch (error) {
      const { message } = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartAction.fulfilled, (state, action) => {
      state.status = "fetch succeeded";
      state.cart = action.payload.cart;
      state.totalPrice = action.payload.totalPrice;
    });
    builder.addCase(fetchCartAction.rejected, (state, action) => {
      state.status = "fetch failed";
    });
    builder.addCase(fetchCartAction.pending, (state, action) => {
      state.status = "fetch pending";
    });
    builder.addCase(cartIncrementAction.fulfilled, (state, action) => {
      state.status = "increment succeeded";
      state.cart[action.payload.itemId] = action.payload.addedItem;
      state.totalPrice += action.payload.addedPrice;
    });
    builder.addCase(cartIncrementAction.rejected, (state, action) => {
      state.status = "increment failed";
    });
    builder.addCase(cartIncrementAction.pending, (state, action) => {
      state.status = "increment pending";
    });
    builder.addCase(cartDecrementAction.fulfilled, (state, action) => {
      state.status = "decrement succeeded";
      state.cart = action.payload.cart;
      state.totalPrice -= action.payload.reducedPrice;
    });
    builder.addCase(cartDecrementAction.rejected, (state, action) => {
      state.status = "decrement failed";
    });
    builder.addCase(cartDecrementAction.pending, (state, action) => {
      state.status = "decrement pending";
    });
  },
});

export default cartSlice.reducer;
