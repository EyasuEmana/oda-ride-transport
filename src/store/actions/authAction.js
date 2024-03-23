import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { remote_host } from "../../globalVariable";

export const signIn = createAsyncThunk(
  "user/login",
  async (values, thunkAPI) => {
    const body = JSON.stringify({
      username: values.username,
      password: values.password,
    });

    try {
      var res;
      await axios.post(`${remote_host}/api/v1/auth/login`, body).then((response) => {
        res = response.data;
      });
      return res;
    } catch (error) {
      var errorText = "";

      const status = error.response.data.status;
      switch (status) {
        case 400:
          errorText = "Invalid request format!";
          break;
        case 401:
          errorText = "wrong username or password!";
          break;
        case 402:
          errorText = "prepayment required";
          break;
        case 403:
          errorText = "You have no access right to the system!";
          break;
        case 404:
          errorText = "Not Found!";
          break;
        default:
          errorText = "something went wrong!";
          break;
      }
      return thunkAPI.rejectWithValue(errorText);
    }
  }
);


export const signup = createAsyncThunk(
  "user/signup",
  async (values, thunkAPI) => {
    const body = JSON.stringify({
      username: values.username,
      password: values.password,
    });

    try {
      var res;
      await axios.post(`${remote_host}/api/v1/auth/login`, body).then((response) => {
        res = response.data;
      });
      return res;
    } catch (error) {
      var errorText = "";

      const status = error.response.data.status;
      switch (status) {
        case 400:
          errorText = "Invalid request format!";
          break;
        case 401:
          errorText = "wrong username or password!";
          break;
        case 402:
          errorText = "prepayment required";
          break;
        case 403:
          errorText = "You have no access right to the system!";
          break;
        case 404:
          errorText = "Not Found!";
          break;
        default:
          errorText = "something went wrong!";
          break;
      }
      return thunkAPI.rejectWithValue(errorText);
    }
  }
);
