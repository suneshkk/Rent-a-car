import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../redux/features/userSlice.js'

export const store = configureStore({
  reducer: {
    user:userSlice,
  },
})