import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./assets/theme";
import { ThemeProvider } from "@mui/material";
import Footer from "./components/footer";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Appbar";
import Cars from "./page/UserManagement/DataTable/Car/Car";
import PointToPointBooks from "./page/UserManagement/DataTable/PointToPointBook/PointToPointBook";
import Users from "./page/UserManagement/DataTable/User/User";
import { QueryClient, QueryClientProvider } from "react-query";
import AddtionalStop from "./page/UserManagement/DataTable/AdditionalStop/AdditionalStop";
import HourlyCharacter from "./page/UserManagement/DataTable/HourlyCharacterBook/HourlyCharacter";
import AirportBooks from "./page/UserManagement/DataTable/AirportBook/airportBook/AirportBook";
import Airports from "./page/UserManagement/DataTable/AirportBook/airports/Airports";
import AirportpickupPreference from "./page/UserManagement/DataTable/AirportBook/airportPickupPereference/AirportPickupPreference";
import ViewCarDetail from "./page/UserManagement/DataTable/Car/ViewCarDetail";
import AddAirPort from "./page/UserManagement/DataTable/AirportBook/airports/addAirport";
import ViewBookDetail from "./page/UserManagement/DataTable/AirportBook/airportBook/AirportBookDetail";
import ViewHourlyBookDetail from "./page/UserManagement/DataTable/HourlyCharacterBook/HourlyBookDetail";
import P2pBookDetail from "./page/UserManagement/DataTable/PointToPointBook/p2pbookDetail";
import UserDetail from "./page/UserManagement/DataTable/User/userDetail";
import ExtraOptionDetail from "./page/UserManagement/DataTable/ExtraOption/ExtraoptionDetail";
import ExtraOptions from "./page/UserManagement/DataTable/ExtraOption/ExtraOption";
import AdditionalStopDetail from "./page/UserManagement/DataTable/AdditionalStop/AdditionalStopDetail";
import AirportPickupPreferenceDetail from "./page/UserManagement/DataTable/AirportBook/airportPickupPereference/AirportPickupPreferenceDetail";
import AirportDetail from "./page/UserManagement/DataTable/AirportBook/airports/AirportDetail";
import AddCar from "./page/UserManagement/DataTable/Car/AddCar";

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Routes>
            {/* <Route path="/" element={<LandingPage />}></Route>
          <Route path="/home/:id" element={<HomePage />}></Route>
          <Route path="/map" element={<RideGoogleMap />}></Route>
          <Route path={"*"} element={<ErrorMessage />}></Route> */}

            <Route path="/" element={<Users />} />
            <Route path="/dashboard" name="dashboard" element={<Dashboard />}>
              <Route index element={<Cars />}></Route>
              <Route path={"cars"} element={<Cars />}></Route>
              <Route
                path={"car/cardetails"}
                element={<ViewCarDetail />}
              ></Route>
              <Route
                path={"book/book-detail"}
                element={<ViewBookDetail />}
              ></Route>
              <Route
                path={"book/hourlybook-detail"}
                element={<ViewHourlyBookDetail />}
              ></Route>
              <Route
                path={"book/p2pbook-detail"}
                element={<P2pBookDetail />}
              ></Route>
              <Route path={"user/user-detail"} element={<UserDetail />}></Route>
              <Route
                path={"extra/extra-detail"}
                element={<ExtraOptionDetail />}
              ></Route>

              <Route
                path={"additionalstop/additional-stop-detail"}
                element={<AdditionalStopDetail />}
              ></Route>
              <Route path={"add-airport"} element={<AddAirPort />}></Route>
              <Route path={"add-car"} element={<AddCar />}></Route>
              <Route path={"extraOptions"} element={<ExtraOptions />} />
              <Route
                path={"pointToPointBookss"}
                element={<PointToPointBooks />}
              ></Route>
              <Route path={"users"} element={<Users />}></Route>
              <Route
                path={"additionalstop"}
                element={<AddtionalStop />}
              ></Route>
              <Route
                path={"hourlycharacter"}
                element={<HourlyCharacter />}
              ></Route>
              <Route path={"airportbooking"} element={<Airports />}></Route>
              <Route path={"airports"} element={<Airports />}></Route>
              <Route
                path={"airportPickupPreference"}
                element={<AirportpickupPreference />}
              ></Route>

              <Route
                path={"airport/pickup-prference"}
                element={<AirportPickupPreferenceDetail />}
              ></Route>

              <Route
                path={"airport/airport-detail"}
                element={<AirportDetail />}
              ></Route>

              <Route path={"airportbook"} element={<AirportBooks />}></Route>
            </Route>
          </Routes>
          <Footer />
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
