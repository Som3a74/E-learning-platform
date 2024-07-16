import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getLogin = createAsyncThunk('getLogin/getLogin',async(values,{ rejectWithValue })=>{

   const formData = new FormData();
    values.forEach(([key, value]) => {
        formData.append(key, value);
    });

    try{
        const {data} = await axios.post(`https://selpapi20240618171141.azurewebsites.net/SELP/V1/User/SignIn`,formData)
        return data
    }catch (err){
        console.log(err)
        return rejectWithValue(err.response.data.message)
    }
})


const SliceLogin = createSlice({

    name : 'getLogin',

    initialState :{
        data_login     : null  ,
        loading_login  : false ,
        errors_login   :null   ,
    },

    extraReducers : (builder)=>{
        builder.addCase(getLogin.pending , (state , action)=>{
            console.log('pending');
            state.loading_login = true ;
            state.data_login = null ;
            state.errors_login = null ;
        })
        .addCase(getLogin.fulfilled , (state , action)=>{
            console.log('fulfilled');
            console.log(action.payload)
            state.loading_login = false ;
            state.data_login    = action.payload ;
            state.errors_login  = null ;
        })
        .addCase(getLogin.rejected , (state , action)=>{
            console.log('rejected');
            console.log(action.payload)
            state.loading_login = false ;
            state.data_login    = null ;
            state.errors_login  = action.payload  ;
        })
    }
})

export default SliceLogin.reducer;