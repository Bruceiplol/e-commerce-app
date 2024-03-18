import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth"
import productReducer from "./product"

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    product: productReducer,
  }),
});

export default store;