import { configureStore } from "@reduxjs/toolkit";

import itemsReducer from "./itemsSlice";
import cartSlice from "./cartSlice";

// import errorReducer from "./errorSlice";

export default configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartSlice,
    // error: errorReducer,
  },
  devTools: true,
});
