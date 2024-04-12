import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { host, mock_host_url } from "../../globalVariable";
export const getCars = createAsyncThunk(
  "book/get-cars",
  async (values, thunkAPI) => {
    try {
      var res = await axios.get(mock_host_url + "/cars");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("unable to load cars");
    }
  }
);
