import * as React from "react";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { Collapse, IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { MdExpandMore } from "react-icons/md";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function OrderCard(props) {
  const {
    totalTripFeeInDollars,
    bookingStatus,
    travelType,
    tripType,
    numberOfPassengers,
    pickupDateTime,
    distanceInMiles,
    passengerFullName,
    occasion,
    airline,
    arrivalFlightNumber,
    numberOfSuitcases,
    accommodationAddress,
    Car,
  } = props.order;
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const Field = ({ label, value }) => {
    return (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ backgroundColor: "#DDD", marginY: 0.2, padding: 0.5 }}
      >
        <Typography>{label}</Typography>
        <Typography>{value}</Typography>
      </Stack>
    );
  };
  return (
    <Card sx={{ maxWidth: { xs: 400, md: 345 } }}>
      <CardMedia
        sx={{ height: 140 }}
        image={Car.carImageUrl}
        title="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ backgroundColor: "#DDD", padding: 0.5 }}
        >
          {tripType}
        </Typography>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography>Travel Type</Typography>
          <Typography>{travelType}</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography>Fee</Typography>
          <Typography>${totalTripFeeInDollars}</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography>Status</Typography>
          <Typography>{bookingStatus}</Typography>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <MdExpandMore />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Field label={"Full Name"} value={passengerFullName} />
          <Field label={"suitases"} value={numberOfSuitcases} />
          <Field label={"Num. Of Passengers"} value={numberOfPassengers} />
          {travelType === "Airport" && (
            <>
              <Field label={"Accom. Addr."} value={accommodationAddress} />
              <Field label={"Airline"} value={airline} />
              <Field label={"Flight Number"} value={arrivalFlightNumber} />
            </>
          )}
          {(travelType === "Airport" || travelType === "Point To Point") && (
            <>
              <Field
                label={"Distance"}
                value={distanceInMiles.toFixed(2) + " mile"}
              />
            </>
          )}
          {travelType === "hourly" && (
            <>
              <Field label={"Occasion"} value={occasion} />
            </>
          )}
          <Field label={"Pickup DateTime"} value={pickupDateTime} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
