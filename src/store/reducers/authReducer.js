import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import {
  forgetPassword,
  resetPassword,
  signIn,
  signup,
} from "../actions/authAction";

const initialState = {
  signinLoanding: false,
  isAuthenticated: false,
  isSigninSuccess: false,
  isSignInFail: false,
  signinErrorMessage: "",
  signinSuccessMessage: "",

  resetPwdLoading: false,
  isResetPwdSuccess: false,
  isResetPwdFail: false,
  resetPwdSuccessMessage: "",
  resetPwdFailMessage: "",

  forgetPwdLoading: false,
  isForgetPwdSuccess: false,
  isForgetPwdFail: false,
  forgetPwdSuccessMessage: "",
  forgetPwdFailMessage: "",

  signupLoanding: false,
  isSignUpFail: false,
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
    disableIsSigninSuccess: (state, action) => {
      state.isSigninSuccess = false;
    },
    logout: (state) => {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("session_expiration");
      state.isAuthenticated = false;
      state.isSigninSuccess = false;
    },
    setIsAuthenticated: (state) => {
      const accessToken = sessionStorage.getItem("access_token");
      state.isAuthenticated = accessToken !== null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.signinLoanding = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      const authtoken = action.payload["auth-token"];
      const decodedToken = jwtDecode(authtoken);
      // console.log("decodedToken: ", decodedToken);

      const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
      const currentTime = new Date().getTime(); // Current time in milliseconds
      const sessionDuration = expirationTime - currentTime;

      sessionStorage.setItem("access_token", authtoken);
      sessionStorage.setItem("session_expiration", sessionDuration.toString()); // Store session duration

      state.signinLoanding = false;
      state.isSigninSuccess = true;
      state.signinSuccessMessage = "Signin success!";
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.signinLoanding = false;
      state.isSignInFail = true;
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
    builder.addCase(resetPassword.pending, (state) => {
      state.resetPwdLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isResetPwdSuccess = true;
      state.resetPwdSuccessMessage = "Password changed successfully";
      state.resetPwdLoading = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.resetPwdLoading = false;
      state.isResetPwdFail = true;
      state.resetPwdFailMessage = action.payload;
    });

    builder.addCase(forgetPassword.pending, (state) => {
      state.forgetPwdLoading = true;
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      state.isForgetPwdSuccess = true;
      state.isForgetPwdFail = false;
      state.forgetPwdSuccessMessage =
        "We've sent instruction to change password to the email!";
      state.forgetPwdLoading = false;
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.forgetPwdLoading = false;
      state.isForgetPwdSuccess = false;
      state.isForgetPwdFail = true;
      state.forgetPwdFailMessage = action.payload;
    });
  },
});

export const {
  login,
  logout,
  setIsAuthenticated,
  setRole,
  setMenuAction,
  disableIsSigninSuccess,
} = UserSlice.actions;
export default UserSlice.reducer;
