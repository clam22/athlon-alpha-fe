import type { User } from "@/models/user.model"
import {createSlice, type PayloadAction} from "@reduxjs/toolkit"

interface UserState {
    user: User | null
    isConfirmed: boolean
    isAuthenticated: boolean
}

const initialState: UserState = {
    user: null,
    isConfirmed: false,
    isAuthenticated: true
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isConfirmed = true
            state.isAuthenticated = true
        },
        clearUser: (state) => {
            state.user = null
            state.isConfirmed = false
            state.isAuthenticated = false
        }
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer