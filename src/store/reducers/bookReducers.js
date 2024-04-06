import { createSlice } from "@reduxjs/toolkit";
import { book, getPassengerBooks } from "../actions/bookActions";

const initialState = {
  cars: [],
  isBookPending: false,
  isBookSuccess: false,
  isError: false,
  errorMessage: "",
  cost: 0,
  fee: 0,

  isGetPassengerBookLoading: false,
  passengerBooks: [],
};

const UserSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    adFee: (state, action) => {
      state.fee = state.fee + action.payload;
    },
    reducefee: (state, action) => {
      state.fee = state.fee - action.payload;
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

    builder.addCase(getPassengerBooks.pending, (state, action) => {
      state.isGetPassengerBookLoading = true;
    });
    builder.addCase(getPassengerBooks.fulfilled, (state, action) => {
      return {
        ...state,
        isGetPassengerBookLoading: false,
        passengerBooks: action.payload,
      };
    });
    builder.addCase(getPassengerBooks.rejected, (state, action) => {
      state.isGetPassengerBookLoading = false;
      state.errorMessage = action.payload;
      state.isError = true;
    });
  },
});

export const { adFee, reduceCost } = UserSlice.actions;
export default UserSlice.reducer;
