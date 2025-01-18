import { createSlice } from "@reduxjs/toolkit";
import { getAllCars } from "../actions/carAction";

const initialState = { loading: false, cars: [] };
const CarSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    updateCars: (state, action) => {
      state.cars = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCars.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllCars.fulfilled, (state, action) => {
      state.cars = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllCars.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const { updateCars } = CarSlice.actions;
export default CarSlice.reducer;
