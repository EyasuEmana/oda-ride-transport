import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mock_host_url, remote_host } from "../../globalVariable";

export const book = createAsyncThunk(
  "book/apply-book",
  async (values, thunkAPI) => {
    const { rideInfo, contact, tripDetail, vehicle, travelType } = values;
    var res = null;
    const body = {
      pickupPhysicalAddress: rideInfo?.pickupPhysicalAddress,
      pickupLongitude: rideInfo?.pickupLongitude,
      pickupLatitude: rideInfo?.pickupLatitude,
      dropoffPhysicalAddress: rideInfo?.dropoffPhysicalAddress,
      dropoffLongitude: rideInfo?.dropoffLongitude,
      dropoffLatitude: rideInfo?.dropoffLatitude,
      numberOfPassengers: vehicle?.numberOfPassengers,
      numberOfSuitcases: vehicle?.numberOfSuitcases,
      pickupDateTime:
        tripDetail?.formattedPickupDate + " " + tripDetail?.formattedPickupTime,
      specialInstructions: tripDetail?.instruction,
      bookingFor: contact?.bookingFor,
      passengerFullName: contact?.passengerFullName,
      passengerCellPhone: contact?.passengerCellPhone,
      carId: vehicle?.vehicle,
      extraOptions: vehicle.extraOptions,
    };
    const isRoundTrip = () => {
      var tripType = body.tripType;
      return (
        tripType == "Round-Trip" ||
        tripType == "Ride to the airport(round trip)" ||
        tripType == "Ride from the airport(round trip)"
      );
    };
    if (rideInfo?.tripType == "Round-Trip") {
      body.returnPickupDateTime =
        tripDetail?.formattedReturnPickupDate +
        " " +
        tripDetail?.formattedReturnPickupTime;
    }
    var extraOptions = [];
    body.extraOptions.map((option) => {
      extraOptions.push({
        extraOptionId: option.extraOptionId,
        quantity: option.quantity,
      });
    });
    body.extraOptions = extraOptions;

    try {
      if (travelType == 1) {
        body.tripType = rideInfo?.tripType;
        body.distanceInMiles = rideInfo?.distanceInMiles;

        res = await axios.post(
          remote_host + "/api/v1/point-to-point-books",
          body
        );
      } else if (travelType == 2) {
        const body = {
          tripType: rideInfo?.tripType,
          airportId: rideInfo?.airPortId,
          numberOfPassengers: vehicle?.numberOfPassengers,
          numberOfSuitcases: vehicle?.numberOfSuitcases,
          accommodationAddress: "123 Main St, Anytown, USA",
          accommodationLongitude: -73.935242,
          accommodationLatitude: 40.73061,
          airline: tripDetail?.airline,
          arrivalFlightNumber: tripDetail?.arrivalFlightNumber,
          specialInstructions: tripDetail?.instruction,
          pickupDateTime:
            tripDetail?.formattedPickupDate +
            " " +
            tripDetail?.formattedPickupTime,
          distanceInMiles: rideInfo?.distanceInMiles,
          carId: vehicle?.vehicle,
          additionalStopId: 1,
          additionalStopOnTheWayDescription: "hello",
          pickupPreferenceId: tripDetail?.pickupPreference,
          extraOptions: extraOptions,
          bookingFor: contact?.bookingFor,
          passengerFullName: contact?.passengerFullName,
          passengerCellPhone: contact?.passengerCellPhone,
        };
        if (
          rideInfo?.tripType == "Ride from the airport(round trip)" ||
          rideInfo?.tripType == "Ride to the airport(round trip)"
        ) {
          body.returnPickupDateTime =
            tripDetail?.formattedReturnPickupDate +
            " " +
            tripDetail?.formattedReturnPickupTime;
        }
        res = await axios.post(remote_host + "/api/v1/airport-books", body);
        return res.data;
      } else if (travelType == 3) {
        body.selectedHours = rideInfo?.hour;
        body.occasion = tripDetail?.occation;
        res = await axios.post(
          remote_host + "/api/v1/hourly-charter-books",
          body
        );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
