import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getCreateContent = createAsyncThunk('getCreateContent/getCreateContent',async(values,{ rejectWithValue })=>{

   const formData = new FormData();
    values.forEach(([key, value]) => {
        formData.append(key, value);
    });

    try{
        const {data} = await axios.post(`https://selpapi20240618171141.azurewebsites.net/Content/SELP/V1/Content/Create`,formData)
        return data
    }catch (err){
        console.log(err)
        return rejectWithValue(err.response.data.message)
    }
})


const SliceCreateContent = createSlice({

    name : 'getCreateContent',

    initialState :{
        data_CreateContent     : null  ,
        loading_CreateContent  : false ,
        errors_CreateContent   :null   ,
    },

    extraReducers : (builder)=>{
        builder.addCase(getCreateContent.pending , (state , action)=>{
            console.log('pending');
            state.loading_CreateContent = true ;
            state.data_CreateContent = null ;
            state.errors_CreateContent = null ;
        })
        .addCase(getCreateContent.fulfilled , (state , action)=>{
            console.log('fulfilled');
            console.log(action.payload)
            state.loading_CreateContent = false ;
            state.data_CreateContent    = action.payload ;
            state.errors_CreateContent  = null ;
        })
        .addCase(getCreateContent.rejected , (state , action)=>{
            console.log('rejected');
            console.log(action.payload)
            state.loading_CreateContent = false ;
            state.data_CreateContent    = null ;
            state.errors_CreateContent  = action.payload  ;
        })
    }
})

export default SliceCreateContent.reducer;