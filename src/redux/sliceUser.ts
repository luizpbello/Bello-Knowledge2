import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  admin: boolean;
  iat: number;
  exp: number;
  token: string;
}

const INITIAL_STATE: User = {
  id: 0,
  name: "",
  email: "",
  avatarUrl: "",
  admin: false,
  iat: 0,
  exp: 0,
  token: "",
};

const sliceUser = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl;
      state.admin = action.payload.admin;
      state.iat = action.payload.iat;
      state.exp = action.payload.exp;
      state.token = action.payload.token;
    },
  },
});


export default sliceUser.reducer;
export const {setUser} = sliceUser.actions
export const useUser = (state:any) => {
    return state.user as User
}