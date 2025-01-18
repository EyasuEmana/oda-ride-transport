import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { remote_host } from "../../globalVariable";
export const getExtraOptions = createAsyncThunk(
  "extra-options/get",
  async (values, thunkAPI) => {
    try {
      var res = await axios.get(remote_host + "/api/v1/extra-options");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("unable to load cars");
    }
  }
);
