import { createSlice } from "@reduxjs/toolkit";
import { book, getCars } from "../actions/bookActions";

const initialState = {
  cars: [],
  isBookSuccess: false,
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

    builder.addCase(book.pending, (state, action) => {});
    builder.addCase(book.fulfilled, (state, action) => {
      state.isBookSuccess = true;
      console.log("data", action);
    });
    builder.addCase(book.rejected, (state, action) => {});
  },
});

export const { login, updateCars } = UserSlice.actions;
export default UserSlice.reducer;
