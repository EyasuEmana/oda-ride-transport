import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { remote_host } from "../../globalVariable";
import { authHeader } from "../../util/getAuthHeader";

export const book = createAsyncThunk(
  "book/apply-book",
  async (values, thunkAPI) => {
    const { rideInfo, contact, tripDetail, vehicle, travelType } = values;
    var res = null;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    };
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
      additionalStopId: tripDetail.additionalStopId || 0,
      additionalStopOnTheWayDescription:
        tripDetail.additionalStopOnTheWayDescription,
      passengerFullName: contact?.passengerFullName,
      passengerCellPhone: contact?.passengerCellPhone,
      carId: vehicle?.vehicle,
      extraOptions: vehicle.extraOptions,
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
          body,
          headers
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
          additionalStopId: tripDetail.additionalStopId || 0,
          additionalStopOnTheWayDescription:
            tripDetail.additionalStopOnTheWayDescription,
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
        res = await axios.post(
          remote_host + "/api/v1/airport-books",
          body,
          headers
        );
        return res.data;
      } else if (travelType == 3) {
        body.selectedHours = rideInfo?.hour;
        body.occasion = tripDetail?.occation;
        res = await axios.post(
          remote_host + "/api/v1/hourly-charter-books",
          body,
          headers
        );
      }
    } catch (error) {
      const errorText = error?.response
        ? error?.response.data.message
        : "Network Error";
      return thunkAPI.rejectWithValue(errorText);
    }
  }
);

export const getPassengerBooks = createAsyncThunk(
  "book/get-passenger-books",
  async (values, thunkAPI) => {
    const books = [];
    await axios
      .get(`${remote_host}/api/v1/users/bookings/mine`, authHeader())
      .then((result) => {
        console.log("data: ", result.data);
        const { pointToPointBookings, hourlyCharterBookings, airportBookings } =
          result.data;
        pointToPointBookings.forEach((pointToPointBook) => {
          const book = {
            travelType: "Point To Point",
            travelType: pointToPointBook.tripType,
            serviceFee: pointToPointBook?.serviceFee || 200,
            status: pointToPointBook.bookingStatus,
          };
          books.push(book);
        });

        hourlyCharterBookings.forEach((hourlyBook) => {
          const book = {
            travelType: "Hourly",
            travelType: null,
            serviceFee: hourlyBook?.serviceFee || 200,
            hour: hourlyBook.hour,
            status: hourlyBook.bookingStatus,
          };
          books.push(book);
        });

        airportBookings.forEach((airportBook) => {
          const book = {
            travelType: "Airport",
            travelType: airportBook.tripType,
            serviceFee: airportBook?.serviceFee || 200,
            status: airportBook.bookingStatus,
          };

          books.push(book);
        });
      })
      .catch((error) => {
        const errorText = error?.response
          ? error?.response.data.message
          : "Network Error";
        return thunkAPI.rejectWithValue(errorText);
      });
    return books;
  }
);
