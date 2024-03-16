import { createSlice } from "@reduxjs/toolkit";
import { book, getCars } from "../actions/bookActions";

const initialState = {
  cars: [],
  isBookSuccess: false,
  isError: false,
  errorMessage: "",
  cost: 0,
};

const UserSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    login: (state, action) => {},
    updateCars: (state, action) => {
      state.cars = action.payload;
    },
    addCost: (state, action) => {
      state.cost = state.cost + action.payload;
    },
    reduceCost: (state, action) => {
      state.cost = state.cost - action.payload;
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
    builder.addCase(book.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.isError = true;
    });
  },
});

export const { login, updateCars, addCost, reduceCost } = UserSlice.actions;
export default UserSlice.reducer;
