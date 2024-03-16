import React, { useEffect } from "react";
import { Box, Checkbox, useTheme, FormControlLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { GiCheckMark } from "react-icons/gi";
import { MdRadioButtonUnchecked } from "react-icons/md";
import StepSummary from "../StepSummary";
function Index({
  formik,
  vehicleSummaryData,
  rideSummaryData,
  tripSummaryData,
  contactSummaryData,
}) {
  const theme = useTheme();
  const { isBookSuccess } = useSelector((state) => state.bookReducer);
  useEffect(() => {
    console.log("isBookSuccess", isBookSuccess);
  }, [isBookSuccess]);
  return (
    <Box>
      <Box>
        <StepSummary
          rideSummaryData={rideSummaryData}
          vehicleSummaryData={vehicleSummaryData}
          tripSummaryData={tripSummaryData}
          contactSummaryData={contactSummaryData}
        />
      </Box>
      <FormControlLabel
        name="concent"
        value={formik.values.concent}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.concent && Boolean(formik.errors.concent)}
        control={
          <Checkbox
            checkedIcon={
              <GiCheckMark
                size={22}
                style={{ color: theme.palette.info.main }}
              />
            }
            icon={<MdRadioButtonUnchecked size={22} />}
          />
        }
        label="Concent"
        labelPlacement="end"
      />
    </Box>
  );
}

export default Index;
