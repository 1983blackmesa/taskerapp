import { configureStore } from "@reduxjs/toolkit";

import routReducer from "./rootSlice";

export const store = configureStore({
  reducer: {
    root: routReducer
  }
});