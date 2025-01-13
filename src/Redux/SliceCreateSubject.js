import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

export const getCreateSubject = createAsyncThunk('getCreateSubject/getCreateSubject', async (values , { rejectWithValue }) => {
    try {
        const { userToken } = useSelector((state) => state.ApisliceToken);
        console.log(userToken)
        const { data } = await axios.post(`${process.env.REACT_APP_END_POINT_API}/SELP/V1/Subject/AddSubject`, values ,
            {
                headers: { Authorization: `Bearer ${userToken}` }
            }
        )
        return data
    } catch (err) {
        return rejectWithValue(err.response.data.message)
    }
})

const SliceCreateSubject = createSlice({

    name : 'getCreateSubject',

    initialState :{
        data_CreateSubject    :null,
        loading_CreateSubject :false,
        error_CreateSubject   :null ,
    },
    
    extraReducers : (builder)=>{
        builder.addCase(getCreateSubject.fulfilled , (state , action)=>{
            console.log('fulfilled');
            console.log(action.payload);
            state.loading_CreateSubject = false;
            state.data_CreateSubject    = action.payload;
            state.error_CreateSubject   = null;
        })
        .addCase(getCreateSubject.pending , (state , action)=>{
            console.log('pending');
            state.loading_CreateSubject = true;
            state.data_CreateSubject    = null;
            state.error_CreateSubject   = null;
        })
        .addCase(getCreateSubject.rejected, (state , action)=>{
            console.log('rejected');
            console.log(action.payload);
            state.loading_CreateSubject = false
            state.data_CreateSubject    = null
            state.error_CreateSubject   = action.payload
        })
    }
})

export default SliceCreateSubject.reducer ;