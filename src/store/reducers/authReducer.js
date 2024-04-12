import { createSlice } from "@reduxjs/toolkit";
import { getProfileInfo, signIn } from "../actions/user";
import EtraOptions from "../../page/UserManagement/DataTable/ExtraOption/EtraOption";
import { editProfileInfo } from "../actions/editProfileInfo";
import { registration } from "../actions/registration";
// import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";

const initialState = {
  isLoggedIn: false,
  isLoginPoppedUp: false,
  isLoadingSignin: false,
  loginErrorMsg: null,
  userProfileInfo: {},
  role: "",
  menu: [
    {
      title: "Home",
      url: "#home",
    },
    {
      title: "Features",
      url: "#features",
    },
    {
      title: "About Us",
      url: "/aboutUs",
    },
    
    {
      title: "FAQ",
      url: "#faq",
    },
    {
      title: "Testimony",
      url: "#testimony",
    },
    {
      title: "Contact Us",
      url: "#footer",
    },
    {
      title: "Help",
      url: "#help",
    },
  ],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.isLoggedIn = false;
    },

    setRole: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoadingSignin = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoadingSignin = false;
      const { access_token, refresh_token } = action.payload;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("isAuthenticated", "true");
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loginErrorMsg = action.payload;
      state.isLoadingSignin = false;
    });

    builder.addCase(getProfileInfo.fulfilled, (state, action) => {
      state.userProfileInfo = action.payload;
    });
    builder.addCase(registration.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      console.log("fulfilled");
      state.userProfileInfo = action.payload;
    });
    builder.addCase(registration.rejected, (state, action) => {
      console.log("rejected");

      console.log(action);
    });
  },
});

export const { login, logout, setRole, setMenuAction } = UserSlice.actions;
export default UserSlice.reducer;
