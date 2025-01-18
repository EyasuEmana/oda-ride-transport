import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { remote_host } from "../../globalVariable";
import { authHeader } from "../../util/authUtil";

export const book = createAsyncThunk(
  "book/apply-book",
  async (values, thunkAPI) => {
    const { rideInfo, contact, tripDetail, vehicle, travelType } = values;
    var res = null;

    const headers = contact.isGuestBooking ? null : authHeader();
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
      returnPickupDateTime: "",
      specialInstructions: tripDetail?.instruction,
      bookingFor: contact?.bookingFor,
      additionalStopId: tripDetail.additionalStopId || 0,
      additionalStopOnTheWayDescription:
        tripDetail.additionalStopOnTheWayDescription,
      passengerFullName: contact?.passengerFullName,
      passengerEmail: contact?.email,
      gratuityId: contact.gratuityId,
      isGuestBooking: contact.isGuestBooking,
      passengerCellPhone: contact?.passengerCellPhone,
      carId: vehicle?.vehicle,
      extraOptions: vehicle.extraOptions,
      creditCardNumber: contact.creditCardNumber,
      cardOwnerName: contact.cardOwnerName,
      expirationDate: contact.expirationDate,
      securityCode: contact.securityCode,
      zipCode: contact.zipCode,
    };
    if (rideInfo?.tripType == "Round-Trip") {
      body.returnPickupDateTime =
        tripDetail?.formattedReturnPickupDate +
        " " +
        tripDetail?.formattedReturnPickupTime;
    } else if (travelType == "3" || rideInfo?.tripType == "One-Way") {
      delete body.returnPickupDateTime;
    }
    var extraOptions = [];
    body.extraOptions.map((option) => {
      extraOptions.push({
        extraOptionId: option.extraOptionId,
        quantity: option.quantity,
      });
    });
    body.extraOptions = extraOptions;
    if (extraOptions.length === 0) {
      delete body.extraOptions;
    }
    try {
      if (travelType == "2") {
        body.tripType = rideInfo?.tripType;
        body.distanceInMiles = rideInfo?.distanceInMiles;

        if (!tripDetail.additionalStopId || tripDetail.additionalStopId == 0) {
          delete body.additionalStopId;
          delete body.additionalStopOnTheWayDescription;
        }

        res = await axios.post(
          remote_host + "/api/v1/point-to-point-books",
          body,
          headers
        );
      } else if (travelType == "1") {
        const body = {
          tripType: rideInfo?.tripType,
          airportId: rideInfo?.airPortId,
          numberOfPassengers: vehicle?.numberOfPassengers,
          numberOfSuitcases: vehicle?.numberOfSuitcases,
          accommodationAddress: rideInfo?.accommodationAddress,
          accommodationLongitude: rideInfo?.accommodationLongitude,
          accommodationLatitude: rideInfo?.accommodationLatitude,
          airline: tripDetail?.airline,
          arrivalFlightNumber: tripDetail?.arrivalFlightNumber,
          returnAirline: "",
          returnFlightNumber: "",
          gratuityId: contact.gratuityId,
          specialInstructions: tripDetail?.instruction,
          isGuestBooking: contact.isGuestBooking,
          pickupDateTime:
            tripDetail?.formattedPickupDate +
            " " +
            tripDetail?.formattedPickupTime,
          returnPickupDateTime: "",

          distanceInMiles: rideInfo?.distanceInMiles,
          carId: vehicle?.vehicle,
          additionalStopId: tripDetail.additionalStopId,
          additionalStopOnTheWayDescription:
            tripDetail.additionalStopOnTheWayDescription,
          pickupPreferenceId: tripDetail?.pickupPreference,
          extraOptions: extraOptions,
          bookingFor: contact?.bookingFor,
          passengerFullName: contact?.passengerFullName,
          passengerCellPhone: contact?.passengerCellPhone,
          passengerEmail: contact?.email,
          creditCardNumber: contact.creditCardNumber,
          cardOwnerName: contact.cardOwnerName,
          expirationDate: contact.expirationDate,
          securityCode: contact.securityCode,
          zipCode: contact.zipCode,
        };
        if (body.extraOptions.length === 0) {
          delete body.extraOptions;
        }
        if (
          rideInfo?.tripType == "Ride from the airport(round trip)" ||
          rideInfo?.tripType == "Ride to the airport(round trip)"
        ) {
          body.returnPickupDateTime =
            tripDetail?.formattedReturnPickupDate +
            " " +
            tripDetail?.formattedReturnPickupTime;

          body.returnAirline = tripDetail.returnAirline
          body.returnFlightNumber = tripDetail.returnFlightNumber

        } else {
          delete body.returnPickupDateTime;
          delete body.returnAirline
          delete body.returnFlightNumber
        }
        if (!tripDetail.additionalStopId || tripDetail.additionalStopId == 0) {
          delete body.additionalStopId;
          delete body.additionalStopOnTheWayDescription;
        }

        res = await axios.post(
          remote_host + "/api/v1/airport-books",
          body,
          headers
        );
        return res.data;
      } else if (travelType === "3") {
        if (!tripDetail.additionalStopId || tripDetail.additionalStopId == 0) {
          delete body.additionalStopId;
          delete body.additionalStopOnTheWayDescription;
        }
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
    try {
      await axios
        .get(`${remote_host}/api/v1/users/bookings/mine`, authHeader())
        .then((result) => {
          const {
            pointToPointBookings,
            hourlyCharterBookings,
            airportBookings,
          } = result.data;
          pointToPointBookings.forEach((pointToPointBook) => {
            const book = {
              ...pointToPointBook,
              bookId: pointToPointBook.pointToPointBookId,
              travelType: "Point To Point",
              tripType: pointToPointBook.tripType,
            };
            books.push(book);
          });

          hourlyCharterBookings.forEach((hourlyBook) => {
            const book = {
              ...hourlyBook,
              bookId: hourlyBook.hourlyCharterBookId,
              travelType: "Hourly",
              tripType: "Hourly",
            };
            books.push(book);
          });

          airportBookings.forEach((airportBook) => {
            const book = {
              ...airportBook,
              bookId: airportBook.airportBookId,
              travelType: "Airport",
              tripType: airportBook.tripType,
            };

            books.push(book);
          });
        });
      return books;
    } catch (error) {
      const errorText = error?.response
        ? error?.response.data.message
        : "Network Error";
      console.log("error");
      return thunkAPI.rejectWithValue(errorText);
    }
  }
);
