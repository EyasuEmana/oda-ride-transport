import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { remote_host } from "../../globalVariable";

const cars = [
  {
    carId: 4,
    carName: "Hyundai venue",
    carImageUrl:
      "https://www.shutterstock.com/image-photo/side-view-on-black-full-600nw-2368375245.jpg",
    carDescription: "A stylish and efficient car for your needs",
    maxPassengers: 5,
    maxSuitcases: 3,
    carType: "Sedan",
    pricePerMile: "0.75",
    pricePerHour: "50.00",
    currency: "USD",
    engineType: "V6",
    length: "4.50",
    interiorColor: "Beige",
    exteriorColor: "Blue",
    power: "200 HP",
    transmissionType: "Automatic",
    fuelType: "Gasoline",
    extras: "Bluetooth, GPS, Sunroof",
    createdAt: "2024-03-09T14:15:17.000Z",
    updatedAt: "2024-03-09T14:15:17.000Z",
    deletedAt: null,
    isSelected: false,
  },
  {
    carId: 5,
    carName: "Lamborghini",
    carImageUrl:
      "https://pictures.dealer.com/a/autonationdrive/1404/7c2f7cc2d8d591eb240acf2d28f5a21dx.jpg?impolicy=downsize&w=568",
    carDescription: "A stylish and efficient car for your needs",
    maxPassengers: 8,
    maxSuitcases: 2,
    carType: "SUV",
    pricePerMile: "0.75",
    pricePerHour: "100.00",
    currency: "USD",
    engineType: "V6",
    length: "4.50",
    interiorColor: "Beige",
    exteriorColor: "Blue",
    power: "200 HP",
    transmissionType: "Automatic",
    fuelType: "Gasoline",
    extras: "Bluetooth, GPS, Sunroof",
    createdAt: "2024-03-09T14:16:29.000Z",
    updatedAt: "2024-03-09T14:16:29.000Z",
    deletedAt: null,
    isSelected: false,
  },
  {
    carId: 6,
    carName: "LandCruiser V8",
    carImageUrl:
      "https://carsales.pxcrush.net/carsales//cars/dealer/ej0z41kppel3mik3nzok8m469.jpg?pxc_method=gravityfill&pxc_bgtype=self&pxc_size=720,480",
    carDescription: "A stylish and efficient car for your needs",
    maxPassengers: 7,
    maxSuitcases: 3,
    carType: "Limousis",
    pricePerMile: "0.75",
    pricePerHour: "2000.00",
    currency: "USD",
    engineType: "V6",
    length: "4.50",
    interiorColor: "Beige",
    exteriorColor: "Blue",
    power: "200 HP",
    transmissionType: "Automatic",
    fuelType: "Gasoline",
    extras: "Bluetooth, GPS, Sunroof",
    createdAt: "2024-03-09T14:17:48.000Z",
    updatedAt: "2024-03-09T14:17:48.000Z",
    deletedAt: null,
    isSelected: false,
  },
];

export const getAllCars = createAsyncThunk(
  "car/get-cars",
  async (values, thunkAPI) => {
    try {
      var res = await axios.get(remote_host + "/api/v1/cars");
      //   var res = await axios.get(remote_host + "/api/v1/cars");
       console.log("cars: ",res.data)
      return res.data;
      // return cars;
    } catch (error) {
      return thunkAPI.rejectWithValue("unable to load cars");
    }
  }
);
