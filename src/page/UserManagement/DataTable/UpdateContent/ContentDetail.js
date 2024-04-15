import { useLocation } from "react-router-dom";

function ContentDetail (props){
    const location = useLocation();

    const {
      contactEmail,
      contactPhoneNumber,
      addressZipCode,
      addressState,
      aboutUsDescription,

    } = location.state?.rowData || {};
    

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
        <Grid item container xs={11} lg={8} spacing={2} mt={2}>
          <Field label="Contact Phone Number" value={contactPhoneNumber} />
          <Field label="Contact Email" value={contactEmail} />
          <Field label="Address Zip-Code" value={addressZipCode} />
          <Field label="Address State" value={addressState} />
          <Field label="About-Us Description" value={aboutUsDescription} />

        </Grid>
      </Grid>
    );
  }
  export default ContentDetail;