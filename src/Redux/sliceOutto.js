// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const generationConfig = {
//     // stopSequences: ["red"],
//     maxOutputTokens: 50,
//     temperature: 0.1,
//     topP: 0.1,
//     // topK: 16,
// }

// export const postOutto = createAsyncThunk('postOutto/postOutto' ,async (textq , { rejectWithValue })=>{    
//     console.log(textq);
//     if (textq != '') {
//         try {
//             let bodyRequest = {
//                 "model": "gemini-pro",
//                 "contents": [{ "parts": [{ "text": `${textq}` }] }]
//             }
//             let response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDLqph46j_KrnVUv9nQgvKHvET2brLbEsE', bodyRequest, generationConfig);
//             return response.data.candidates[0].content.parts[0].text
//         } catch (err) {
//             return rejectWithValue(err)
//         }
//     }else{
//         return 'Enter your Quistion'
//     }
// })

// const sliceOutto = createSlice({

//     name : 'postOutto',

//     initialState :{
//         data_Outto    :null,
//         loading_Outto :false,
//         error_Outto   :null ,
//     },
    
//     extraReducers : (builder)=>{
//         builder.addCase(postOutto.fulfilled , (state , action)=>{
//             console.log('fulfilled');
//             console.log(action.payload);
//             state.loading_Outto = false;
//             state.data_Outto    = action.payload;
//             state.error_Outto   = null;
//         })
//         .addCase(postOutto.pending , (state , action)=>{
//             console.log('pending');
//             state.loading_Outto = true;
//             state.data_Outto    = null;
//             state.error_Outto   = null;
//         })
//         .addCase(postOutto.rejected, (state , action)=>{
//             console.log('rejected');
//             console.log(action.payload);
//             state.loading_Outto = false
//             state.data_Outto    = null
//             if (action.payload = "Cannot read properties of undefined (reading '0')") {
//                 state.error_Outto = 'quistion is wrong'      
//             } else {
//                 state.error_Outto   = action.payload
//             }
//         })
//     }
// })

// export default sliceOutto.reducer ;
