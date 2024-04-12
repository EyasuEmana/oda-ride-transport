import { createAsyncThunk } from "@reduxjs/toolkit";
import { host } from "../../constants";
import axios from "axios";

export const signIn = createAsyncThunk(
  "user/login",
  async (values, thunkAPI) => {
    const body = JSON.stringify({
      username: values.username,
      password: values.password,
    });

    try {
      var res;
      await axios.post(`${host}/login`, body).then((response) => {
        res = response.data;
      });
      return res;
    } catch (error) {
      console.log(error);
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
