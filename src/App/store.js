import { configureStore } from '@reduxjs/toolkit'
import AuthAdminReducer from  '../features/AuthAdmin/AuthAdminSlice'
import CurrentUserSlice from '../features/currentUser/CurrentUserSlice'
export const store = configureStore({
  reducer: {
      auth: AuthAdminReducer,
      currentUser: CurrentUserSlice,
  },
})