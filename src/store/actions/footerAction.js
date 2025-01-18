import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { remote_host } from "../../globalVariable";
export const getFooterData = createAsyncThunk(
  "gooter/get-footer-data",
  async (values, thunkAPI) => {
    try {
      var res = await axios.get(remote_host + "/api/v1/footer-contents");
       return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("unable to load footer data");
    }
  }
);
