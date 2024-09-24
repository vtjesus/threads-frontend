import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { PostType } from '../../lib/type';


type initialStateType = {
    post:PostType[]
}

const initialState:initialStateType = {
   post:[]
}


const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        GetPost:(state,action:PayloadAction<PostType[]>)=>{
              state.post = action.payload
        },
        AddPost:(state,action)=>{
              state.post = [...state.post,action.payload]
        },
        EditPost:(state,action:PayloadAction<PostType>)=>{
            const PostToEdit = state.post.findIndex((post)=>post._id === action.payload._id)
            if(PostToEdit){
                state.post[PostToEdit] = {...state.post[PostToEdit],...action.payload}
            }
        }
    }
})

export const {GetPost,AddPost,EditPost} = postSlice.actions
export default postSlice.reducer;