import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./loginReducer";
import weatherReducer from "./weatherReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
