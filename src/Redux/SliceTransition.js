import { createSlice } from "@reduxjs/toolkit";

export const SliceTransition = createSlice({
    name: 'getTransition',

    initialState: {
        Lang: null || localStorage.getItem('Language'),
    },

    reducers: {
        handelTrantion: (state, action) => {
            if (state.Lang === 'eng') {
                state.Lang = "ar";
                localStorage.setItem('Language', state.Lang);
            } else {
                state.Lang = "eng";
                localStorage.setItem('Language', state.Lang);
            }
        },
        // getTrantion: (state, action) => {
        //     state.Lang = localStorage.getItem('Language');
        // }
    },
})
export const { handelTrantion , getTrantion} = SliceTransition.actions;
export default SliceTransition.reducer;