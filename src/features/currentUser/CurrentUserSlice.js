import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  currentUserToken: null,
  currentUserEmail: null,
  currentUserUID: null,
  currentUser: false,
  
}

export const CurrentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers:{
        setCurrentUserToken: (state, action)=>{
            state.currentUserToken = action.payload
        },
        setCurrentUserEmail: (state, action)=>{
            state.currentUserEmail = action.payload
        },
        setCurrentUserUID: (state, action)=>{
            state.currentUserUID = action.payload
        },
        setCurrentUser: (state, action)=>{
            state.currentUser = action.payload
        },
    },
    extraReducers:{

    }
})

const {actions, reducer} = CurrentUserSlice;
export const {setCurrentUserToken, setCurrentUserEmail, setCurrentUserUID, setCurrentUser} = actions;
export default reducer;
