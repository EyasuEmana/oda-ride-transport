import { createSlice } from "@reduxjs/toolkit";
import { getCars } from "../actions/bookActions";

const initialState = {
  cars: [],
};

const UserSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    login: (state, action) => {},
    updateCars: (state, action) => {
      state.cars = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCars.pending, (state) => {});
    builder.addCase(getCars.fulfilled, (state, action) => {
      state.cars = action.payload;
    });
    builder.addCase(getCars.rejected, (state, action) => {});
  },
});

export const { login, logout, setRole, setMenuAction, updateCars } =
  UserSlice.actions;
export default UserSlice.reducer;
