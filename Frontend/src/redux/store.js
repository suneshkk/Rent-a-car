import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../redux/features/userSlice.js'
import adminSlice from './features/adminSlice.js'

export const store = configureStore({
  reducer: {
    user:userSlice,
    admin:adminSlice
  },
  
})
