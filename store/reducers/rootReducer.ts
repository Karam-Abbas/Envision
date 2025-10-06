// rootReducer.ts or rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import persistedAuthReducer from "@/store/slices/authSlice";

const appReducer = combineReducers({
  auth: persistedAuthReducer,
  // add more reducers here
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_STORE") {
    state = undefined; // This will reset all slices to their initial state
  }
  return appReducer(state, action);
};

export default rootReducer;
