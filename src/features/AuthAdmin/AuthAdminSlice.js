import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admin: false,
}

export const AuthAdminSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers:{
        adminLogin: (state)=>{
            state.admin = true
        },
        adminLogout: (state)=>{
            state.admin = false
        }
    },
})

const {actions, reducer} = AuthAdminSlice;
export const {adminLogin, adminLogout} = actions;
export default reducer;