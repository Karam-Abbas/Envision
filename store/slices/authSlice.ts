import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/types/userTypes";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state:AuthState,
      action: PayloadAction<{ access: string; refresh: string; }>
    ) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
    },
    logout: (state:AuthState) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
    updateAccessToken: (state:AuthState, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

const persistConfig = {
  key: "auth",
  storage: storageSession,
  whitelist: ["accessToken", "refreshToken"], // specify what to persist
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { setCredentials, logout, updateAccessToken } = authSlice.actions;
export default persistedAuthReducer;

