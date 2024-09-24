import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../lib/type";

type IntitalState = {
    user: UserType | null,
    auth: boolean
}

const initialState: IntitalState = {
    user: null,
    auth: false
}
type AddFollowType = {
    userId: string,
    user: UserType
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        SaveUser: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload,
                state.auth = true
        },
        Logout: (state) => {
            state.user = null,
                state.auth = false
        },
        AddFollow: (state, action: PayloadAction<AddFollowType>) => {
            if (!state.user) {
                return;
            }
            console.log(action.payload)
            const alreadyFollowing = state.user?.following.find((follow) => follow._id === action.payload.userId)
            if (alreadyFollowing) {
                state.user.following = state.user.following.filter((follow) => follow._id !== action.payload.userId)
            } else {
               state.user.following.push(action.payload.user)
            }
        }
    }
})

export const { SaveUser, Logout, AddFollow } = userSlice.actions;
export default userSlice.reducer
