import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./page/landingPage/index";
import HomePage from "./page/homePage/index";
import Dashboard from "./components/Dashboard/Dashboard";
import ErrorMessage from "./components/errorMessage";
import Header from "./components/Appbar";
import theme from "./assets/theme";
import { ThemeProvider } from "@mui/material";
import Footer from "./components/footer";
import RideGoogleMap from "./page/homePage/components/googleMap";
import Order from "./page/order";
import ResetPassword from "./page/landingPage/component/auth/ResetPassword";
import ForgetPassword from "./page/landingPage/component/auth/ForgetPassword";
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
import ContentDetail from "./page/UserManagement/DataTable/UpdateContent/ContentDetail";
import AddContent from "./page/UserManagement/DataTable/UpdateContent/AddContent";
import NotInCaliforniaError from "./components/NotInCaliforniaError";
import { isAdminAuthenticated, isUserAuthenticated } from "./util/authUtil";
import SocialMedia from "./page/UserManagement/DataTable/SocialMedia/SocialMedia";
import SocialMediaDetail from "./page/UserManagement/DataTable/SocialMedia/SocialMediaDetail";
import Admin from "./page/UserManagement/DataTable/Admin/Admin";
import AdminDetails from "./page/UserManagement/DataTable/Admin/Admindetails";
import TermAndCondition from "./page/landingPage/component/termCondition";
import Trust from "./page/landingPage/component/trust";
import PopularPlaces from "./page/UserManagement/DataTable/PopularPlace/PopularPlace";
import AddPopularPlace from "./page/UserManagement/DataTable/PopularPlace/AddpopularPlace";
import ViewPopularPlaceDetail from "./page/UserManagement/DataTable/PopularPlace/PopularPlaceDetail";
import Gratuity from "./page/UserManagement/DataTable/Gratutity/Gratuity";
import GratuityDetails from "./page/UserManagement/DataTable/Gratutity/GratuityDetails";
function App() {
  const [usernameFocus, setUsernameFocus] = useState(false);
  const queryClient = new QueryClient();

  const handleUsernameFocus = () => {
    setUsernameFocus(true);
  };
  const PrivateUserRoute = ({ children }) => {
    return isUserAuthenticated() ? <>{children}</> : <>{children}</>;
  };
  const PrivateAdminRoute = ({ children }) => {
    return isAdminAuthenticated() ? (
      <>{children}</>
    ) : (
      <Navigate to="/error" replace />
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Header handleUsernameFocus={handleUsernameFocus} />
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  usernameFocus={usernameFocus}
                  setUsernameFocus={setUsernameFocus}
                  handleUsernameFocus={handleUsernameFocus}
                />
              }
            />

            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route
              path="/home/:id"
              element={
                <PrivateUserRoute>
                  <HomePage />
                </PrivateUserRoute>
              }
            />
            <Route
              path="/map"
              element={
                <PrivateUserRoute>
                  <RideGoogleMap />
                </PrivateUserRoute>
              }
            />
            <Route
              path="/not-in-california"
              element={<NotInCaliforniaError />}
            />
            <Route
              path="/terms-and-conditions"
              element={<TermAndCondition />}
            />
            <Route
              path="/privacy-policy"
              element={<Trust />}
            />
            <Route
              path="/my-order"
              element={
                <PrivateUserRoute>
                  <Order />
                </PrivateUserRoute>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route
              path="/dashboard"
              name="dashboard"
              element={
                <PrivateAdminRoute>
                  <Dashboard />
                </PrivateAdminRoute>
              }
            >
              <Route index element={<Users />}></Route>
              <Route path={"cars"} element={<Cars />}></Route>
              <Route
                path={"car/cardetails"}
                element={<ViewCarDetail />}
              ></Route>
              <Route path={"add-Admin"} element={<Admin />}></Route>
              <Route
                path={"admin/admin-detail"}
                element={<AdminDetails />}
              ></Route>

              <Route
                path={"book/book-detail"}
                element={<ViewBookDetail />}
              ></Route>
              <Route path={"popular/popular-place"} element={<PopularPlaces />}></Route>
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
              <Route path={"add-popular-place"} element={<AddPopularPlace />}></Route>
              <Route path={"popular-places"} element={<ViewPopularPlaceDetail />}></Route>


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
              <Route
                path={"Content/ContentDetails"}
                element={<ContentDetail />}
              ></Route>
              <Route path={"add-Content"} element={<AddContent />}></Route>

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

              <Route
                path={"social/social-media"}
                element={<SocialMedia />}
              ></Route>

              <Route
                path={"social/social-detail"}
                element={<SocialMediaDetail />}
              ></Route>


              <Route
                path={"gratuity"}
                element={<Gratuity />}
              ></Route>

              <Route
                path={"gratuity/gratuity-details"}
                element={<GratuityDetails />}
              ></Route>
              <Route path={"airportbook"} element={<AirportBooks />}></Route>
            </Route>
            <Route path="*" element={<ErrorMessage />} />
          </Routes>
          <Footer />
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
