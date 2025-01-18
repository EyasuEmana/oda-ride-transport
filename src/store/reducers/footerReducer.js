import { createSlice } from "@reduxjs/toolkit";
import { getFooterData } from "../actions/footerAction";

const FooterSlice = createSlice({
  name: "airport",
  initialState: {
    termsAndCondition: "",
    safetyandTrust: "",
    contactEmail: "",
    contactPhoneNumber: "",
    addressZipCode: "",
    addressState: "",
    aboutUsDescription: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getFooterData.pending, (state) => {});
    builder.addCase(getFooterData.fulfilled, (state, action) => {
      const data = action.payload;
      return {
        ...state,
        ...data,
      };
    });
    builder.addCase(getFooterData.rejected, (state) => {});
  },
});
export default FooterSlice.reducer;
