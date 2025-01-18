import { createSlice } from "@reduxjs/toolkit";
import { getAllPreferences } from "../actions/preferenceAction";

const initialState = { loading: false, preferences: [] };
const PreferenceSlice = createSlice({
  name: "preference",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllPreferences.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPreferences.fulfilled, (state, action) => {
      state.preferences = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllPreferences.rejected, (state) => {
      state.loading = false;
    });
  },
});
export default PreferenceSlice.reducer;
