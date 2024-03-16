import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mock_host_url, remote_host } from "../../globalVariable";
export const getCars = createAsyncThunk(
  "book/get-cars",
  async (values, thunkAPI) => {
    try {
      var res = await axios.get(mock_host_url + "/cars");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("unable to load cars");
    }
  }
);

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
      pickupDateTime: tripDetail?.pickupDate + " " + tripDetail?.pickupTime,
      specialInstructions: tripDetail?.instruction,
      bookingFor: contact?.bookingFor,
      passengerFullName: contact?.passengerFullName,
      passengerCellPhone: contact?.passengerCellPhone,

      carId: vehicle?.vehicle,
      extraOptions: vehicle.extraOptions,
    };
    if (rideInfo?.tripType == "Round-Trip") {
      body.returnPickupDateTime =
        tripDetail?.returnPickupDate + " " + tripDetail?.returnPickupTime;
    }

    try {
      if (travelType == 3) {
        body.selectedHours = rideInfo?.hour;
        body.occasion = tripDetail?.occation;
        res = await axios.post(
          remote_host + "/api/v1/hourly-charter-books",
          body
        );
      } else if (travelType == 2) {
        // body.selectedHours = rideInfo?.hour;
        body.additionalStopOnTheWayPrice = 15.995;
        body.tripType = rideInfo?.tripType;
        body.distanceInMiles = rideInfo?.distanceInMiles;
        res = await axios.post(
          remote_host + "/api/v1/point-to-point-books",
          body
        );
      }
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
