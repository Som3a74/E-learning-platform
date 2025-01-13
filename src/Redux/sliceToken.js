import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from 'jwt-decode';

export const sliceToken = createSlice({

    name : "token",

    initialState :{
        userToken: null ,
        decodeToken: null ,
        userName: null ,
    },

    reducers: {
        saveToken: (state , action) => {
            console.log(action.payload)
            localStorage.setItem('userToken' ,action.payload.accessToken);
            localStorage.setItem('userName' ,action.payload.refreshToken.userName);
            state.userName = action.payload.refreshToken.userName;            
            state.userToken = action.payload.accessToken;
            state.decodeToken = jwtDecode(state.userToken);            
        },
        getToken: (state , action) => {
            if (localStorage.getItem('userToken')) {
                state.userToken = localStorage.getItem('userToken') ;
                state.userName = localStorage.getItem('userName') ;
                state.decodeToken = jwtDecode(state.userToken);            
            }
        },
        clearToken: (state) => {
            console.log('clear Done');
            state.userToken = null ;
            state.userToken =localStorage.removeItem('userToken')
        },
    },
})

export const { getToken , clearToken , saveToken} = sliceToken.actions;

export default sliceToken.reducer;