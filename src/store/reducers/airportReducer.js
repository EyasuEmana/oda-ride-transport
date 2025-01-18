import { createSlice } from "@reduxjs/toolkit";
import { getAirports } from "../actions/airportAction";

const AirportSlice = createSlice({
  name: "airport",
  initialState: {
    airports: [],
    loading: false,
    success: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getAirports.pending, (state) => {
      state.isLoadingSignin = true;
    });
    builder.addCase(getAirports.fulfilled, (state, action) => {
      state.airports = action.payload;
      state.success = true;
    });
    builder.addCase(getAirports.rejected, (state) => {
      state.isLoadingSignin = true;
    });
  },
});
export default AirportSlice.reducer;
