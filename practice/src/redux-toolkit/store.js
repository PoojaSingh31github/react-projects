import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer'
// import { apiSlice } from '../services/api'

export const store = configureStore({
  reducer: {
    counter: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
    ),
})