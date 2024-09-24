import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./feature/authSlice";
import postReducer from  "./feature/PostSlice";



const store = configureStore({
    reducer:{
      user:userReducer,
      post:postReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;