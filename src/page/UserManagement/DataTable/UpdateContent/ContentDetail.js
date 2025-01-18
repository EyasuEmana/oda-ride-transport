import { useLocation } from "react-router-dom";
import {
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import useGetData from "../../../../store/hooks/useGetData";
import { ToastContainer } from "react-toastify";
// import { const } from './../../../../store/reducers/extraOptionReducer';

function ContentDetail (props){

    const endpoint = `/api/v1/footer-contents`;
    const {
      data: response,
      isLoading: isLoadingGet,
      isError: isErrorGet,
      isFetching: isFetchingTax,
      error: errorGet,
    } = useGetData(endpoint);
    // console.log("response", response)
// console.log("object", location.state?.rowData)
    const Field = ({ label, value }) => {
      return (
        <Grid item xs={6}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ backgroundColor: "#EEE", padding: 2, borderRadius: 2 }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              {label}
            </Typography>
            <Typography sx={{ fontSize: "20px" }}>{value}</Typography>
          </Stack>
        </Grid>
      );
    };
    return (
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item container  lg={12} spacing={2} mt={2}>
          {response && (
            <>
              <Field label="Contact Phone Number" value={response.contactPhoneNumber} />
              <Field label="Contact Email" value={response.contactEmail} />
              <Field label="Address Zip-Code" value={response.addressZipCode} />
              <Field label="Address State" value={response.addressState} />
              <Field  value={response.aboutUsDescription} />
              <Field  value={response.safetyandTrust} />
              <Field  value={response.termsAndCondition} />

            </>
          )}
        </Grid>
        <ToastContainer/>

      </Grid>

    );
  }
  export default ContentDetail;