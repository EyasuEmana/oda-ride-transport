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
    // console.log(values);
    const { rideInfo, contact, tripDetail, vehicle } = values;
    try {
      var res = await axios.post(remote_host + "/api/v1/point-to-point-books", {
        tripType: rideInfo?.tripType,
        pickupPhysicalAddress: rideInfo?.pickupPhysicalAddress,
        pickupLongitude: rideInfo?.pickupLongitude,
        pickupLatitude: rideInfo?.pickupLatitude,
        dropoffPhysicalAddress: rideInfo?.dropoffPhysicalAddress,
        dropoffLongitude: rideInfo?.dropoffLongitude,
        dropoffLatitude: rideInfo?.dropoffLatitude,
        numberOfPassengers: vehicle?.numberOfPassengers,
        numberOfSuitcases: vehicle?.numberOfSuitcases,
        pickupDateTime: tripDetail?.pickupDate + " " + tripDetail?.pickupTime,
        returnPickupDateTime:
          tripDetail?.returnPickupDate + " " + tripDetail?.returnPickupTime,
        specialInstructions: tripDetail?.instruction,
        bookingFor: "SomeoneElse",
        passengerFullName:
          contact?.passengerFirstName + " " + contact?.passengerLastName,
        passengerCellPhone: contact?.passengerCellPhone,
        distanceInMiles: rideInfo?.distanceInMiles,
        additionalStopOnTheWayPrice: 15.995,
        carId: vehicle?.vehicle,
        extraOptions: vehicle.extraOptions,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("unable to load cars");
    }
  }
);
