import { createSlice } from "@reduxjs/toolkit";
import { book, getPassengerBooks } from "../actions/bookActions";

const initialState = {
  cars: [],
  isBookPending: false,
  isBookSuccess: false,
  errorMessage: "",
  cost: 0,
  fee: 0,
  totalFee: 0,
  prevAirportPickupPreferenceFee: 0,

  isGetPassengerBookLoading: false,
  isGetPassengerBookError: false,
  getPassengerBookErrorMessage: "",
  passengerBooks: [],
};

const UserSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addMinimumInitialFee: (state, action) => {
      state.fee = action.payload;
    },
    adCarFee: (state, action) => {
      state.fee = action.payload;
    },
    adGratitudeFee: (state, action) => {
      state.fee = action.payload;
    },
    addExtraOptionFee: (state, action) => {
      const fee = state.fee + action.payload;
      return {
        ...state,
        fee: fee,
      };
    },
    updateTotalFee: (state, action) => {
      state.totalFee = action.payload
    },
    reduceExtraOptionFee: (state, action) => {
      return {
        ...state,
        fee: state.fee - action.payload,
      };
    },
    reducefee: (state, action) => {
      state.fee = state.fee - action.payload;
    },
    addAirportPreferenceFee: (state, action) => {
      const { prefFee, prevPrefFee } = action.payload;
      state.fee = state.fee - prevPrefFee + prefFee;
    },
    addAdditionalStopFee: (state, action) => {
      const { stopOnWayFee, prevAddtionalStopOnTheWayFee } = action.payload;
      state.fee = state.fee - prevAddtionalStopOnTheWayFee + stopOnWayFee;
    },
    removeAdditionalStopFee: (state, action) => {
      const { stopOnWayFee, prevAddtionalStopOnTheWayFee } = action.payload;
      state.fee = state.fee - prevAddtionalStopOnTheWayFee + stopOnWayFee;
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
        isGetPassengerBookError: false,
        passengerBooks: action.payload,
      };
    });
    builder.addCase(getPassengerBooks.rejected, (state, action) => {
      return {
        ...state,
        isGetPassengerBookError: true,
        getPassengerBookErrorMessage: action.payload,
        isGetPassengerBookLoading: false,
      };
    });
  },
});

export const {
  adCarFee,
  reduceCost,
  addExtraOptionFee,
  adGratitudeFee,
  reduceExtraOptionFee,
  addAirportPreferenceFee,
  addAdditionalStopFee,
  addMinimumInitialFee,
  updateTotalFee,
} = UserSlice.actions;
export default UserSlice.reducer;
