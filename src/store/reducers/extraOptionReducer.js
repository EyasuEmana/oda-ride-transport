import { createSlice } from "@reduxjs/toolkit";
import { getExtraOptions } from "../actions/extraOptions";

const initialState = { loading_extra_option: false, extraOptions: [] };

const ExtraOptionSlice = createSlice({
  name: "extra-options",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExtraOptions.pending, (state, action) => {
      state.loading_extra_option = true;
    });
    builder.addCase(getExtraOptions.fulfilled, (state, action) => {
      state.extraOptions = action.payload;
      state.loading_extra_option = false;
    });

    builder.addCase(getExtraOptions.rejected, (state, action) => {
      state.loading_extra_option = false;
    });
  },
});
export default ExtraOptionSlice.reducer;
