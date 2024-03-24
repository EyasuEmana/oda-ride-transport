import { createSlice } from "@reduxjs/toolkit";
// import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";
import { signIn, signup } from "../actions/authAction";

const initialState = {
  signinLoanding: false,
  signinSuccess: false,
  isSignInFail: false,
  signinErrorMessage: "",

  signupLoanding: false,
  isSignUpFail:false,
  signupErrorMessage: "",
  isSignupSuccess: false,
  signUpSuccessMessage: "",
  userProfileInfo: {},
  role: "",
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
      state.signinLoanding = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.signinLoanding = false;
      state.signinSuccess = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.signinLoanding = false;

      state.signinErrorMessage = action.payload;
    });

    builder.addCase(signup.pending, (state) => {
      state.signupLoanding = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      if (action.payload.fullName) {
        console.log("fullName", action.payload.fullName);

        state.isSignupSuccess = true;
        state.signUpSuccessMessage = `${action.payload.fullName} successfully regestered`;
      }
      state.signupLoanding = false;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.signupLoanding = false;
      state.isSignUpFail = true;
      state.signupErrorMessage = action.payload;
    });
  },
});

export const { login, logout, setRole, setMenuAction } = UserSlice.actions;
export default UserSlice.reducer;
