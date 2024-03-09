import { createSlice } from "@reduxjs/toolkit";
import { getExtraOptions } from "../actions/extraOptions";

const initialState = { extraOptions: [] };

const ExtraOptionSlice = createSlice({
  name: "extra-options",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExtraOptions.pending, (state, action) => {});
    builder.addCase(getExtraOptions.fulfilled, (state, action) => {
      state.extraOptions = action.payload;
    });
    builder.addCase(getExtraOptions.rejected, (state, action) => {});
  },
});
export default ExtraOptionSlice.reducer;
