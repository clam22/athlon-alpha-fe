import type { User } from "@/models/user.model";
import type { AuthenticationMode } from "@/types/authentication.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
  unconfirmedEmail: string;
  isConfirmed: boolean;
  isAuthenticated: boolean;
  authenticationMode: AuthenticationMode;
}

const initialState: UserState = {
  user: null,
  unconfirmedEmail: "",
  isConfirmed: false,
  isAuthenticated: true,
  authenticationMode: "login",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isConfirmed = true;
      state.isAuthenticated = true;
    },
    setUnconfirmedEmail: (state, action: PayloadAction<string>) => {
      state.unconfirmedEmail = action.payload;
    },
    setAuthMode: (state, action: PayloadAction<AuthenticationMode>) => {
      state.authenticationMode = action.payload;
    },
    setisConfirmed: (state) => {
      state.isConfirmed = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isConfirmed = false;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser, setUnconfirmedEmail, setAuthMode, setisConfirmed} =
  userSlice.actions;
export default userSlice.reducer;
