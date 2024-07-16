import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getRegister = createAsyncThunk('getRegister/getRegister' ,async (values , { rejectWithValue })=>{    
    try{
        const {data} = await axios.post(`https://selpapi20240618171141.azurewebsites.net/Register` , values )
        console.log('ss');
        return data
    }catch(err){
        return rejectWithValue(err.response.data.message)
    }
})

const sliceRegister = createSlice({

    name : 'getRegister',

    initialState :{
        data_Register    :null,
        loading_Register :false,
        error_Register   :null ,
    },
    
    extraReducers : (builder)=>{
        builder.addCase(getRegister.fulfilled , (state , action)=>{
            console.log('fulfilled');
            console.log(action.payload);
            state.loading_Register = false;
            state.data_Register    = action.payload;
            state.error_Register   = null;
        })
        .addCase(getRegister.pending , (state , action)=>{
            console.log('pending');
            state.loading_Register = true;
            state.data_Register    = null;
            state.error_Register   = null;
        })
        .addCase(getRegister.rejected, (state , action)=>{
            console.log('rejected');
            console.log(action.payload);
            state.loading_Register = false
            state.data_Register    = null
            state.error_Register   = action.payload
        })
    }
})

export default sliceRegister.reducer ;