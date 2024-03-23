import { createSlice } from "@reduxjs/toolkit";
import { book } from "../actions/bookActions";

const initialState = {
  cars: [],
  isBookPending: false,
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

    addCost: (state, action) => {
      state.cost = state.cost + action.payload;
    },
    reduceCost: (state, action) => {
      state.cost = state.cost - action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(book.pending, (state, action) => {
      state.isBookPending = true;
    });
    builder.addCase(book.fulfilled, (state, action) => {
      state.isBookPending = false;
      state.isBookSuccess = true;
    });
    builder.addCase(book.rejected, (state, action) => {
      state.isBookPending = false;
      state.errorMessage = action.payload;
      state.isError = true;
    });
  },
});

export const { login, addCost, reduceCost } = UserSlice.actions;
export default UserSlice.reducer;
