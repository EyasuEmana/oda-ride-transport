import React, { useEffect } from "react";
import {
  Box,
  Checkbox,
  useTheme,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
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
  return (
    <Box>
      <Box>
        <StepSummary
          rideSummaryData={rideSummaryData}
          vehicleSummaryData={vehicleSummaryData}
          tripSummaryData={tripSummaryData}
          contactSummaryData={contactSummaryData}
          screenType={"large"}
        />
      </Box>
      <FormControl>
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

        {formik.touched.concent && formik.errors.concent && (
          <FormHelperText sx={{ color: "red" }}>
            {formik.errors.concent}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}

export default Index;
