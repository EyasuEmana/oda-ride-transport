import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { remote_host } from "../../globalVariable";
export const getAirports = createAsyncThunk(
  "book/get-cars",
  async (values, thunkAPI) => {
    try {
      var res = await axios.get(remote_host + "/api/v1/airports");
      console.log("airports: ", res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("unable to load cars");
    }
  }
);
