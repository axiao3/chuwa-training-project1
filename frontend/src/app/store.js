import { configureStore } from "@reduxjs/toolkit";

import itemsReducer from "./itemsSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
// import errorReducer from "./errorSlice";

export default configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartSlice,
    user: userSlice,
    // error: errorReducer,
  },
  devTools: true,
});
