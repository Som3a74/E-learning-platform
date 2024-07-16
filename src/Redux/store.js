import { configureStore } from "@reduxjs/toolkit";
import SliceLogin from "./SliceLogin";
import sliceRegister from "./sliceRegister";
import sliceToken from "./sliceToken";
import SliceCreateContent from "./SliceCreateContent";
import SliceTransition from "./SliceTransition";
import SliceCreateSubject from "./SliceCreateSubject";
// import sliceOutto from "./sliceOutto";

export const store = configureStore({
  reducer: {
    ApiSliceLogin: SliceLogin,
    ApisliceRegister: sliceRegister,
    ApisliceToken: sliceToken,
    ApiSliceCreateContent: SliceCreateContent,
    ApiSliceCreateSubject: SliceCreateSubject,
    ApiSliceTransition: SliceTransition,
    // ApisliceOutto : sliceOutto ,
  },
})