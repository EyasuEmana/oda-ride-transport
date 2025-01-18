import { createSlice } from "@reduxjs/toolkit";
import { getExtraOptions } from "../actions/extraOptions";

const initialState = { loading_extra_option: false, extraOptions: [] };

const ExtraOptionSlice = createSlice({
  name: "extra-options",
  initialState,
  reducers: {
    updateExtraOption: (state, action) => {
      state.extraOptions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getExtraOptions.pending, (state) => {
      state.loading_extra_option = true;
    });
    builder.addCase(getExtraOptions.fulfilled, (state, action) => {
      state.extraOptions = action.payload.map((option) => {
        return { ...option, isSelecte: false, itemQuantity: 0 };
      });
      state.loading_extra_option = false;
    });

    builder.addCase(getExtraOptions.rejected, (state) => {
      state.loading_extra_option = false;
    });
  },
});
export const { updateExtraOption } = ExtraOptionSlice.actions;
export default ExtraOptionSlice.reducer;
