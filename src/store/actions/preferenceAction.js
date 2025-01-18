import { remote_host } from "../../globalVariable";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllPreferences = createAsyncThunk(
  "preference/fetch-all",
  async (value, thunkAPI) => {
    try {
      var res = await axios.get(
        remote_host + "/api/v1/airport/pickup-preference"
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("unable to load cars");
    }
  }
);
