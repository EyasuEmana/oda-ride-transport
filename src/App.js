import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./page/landingPage/index";
import HomePage from "./page/homePage/index";

import ErrorMessage from "./components/errorMessage";
import Header from "./components/Appbar";
import theme from "./assets/theme";
import { ThemeProvider } from "@mui/material";
import Footer from "./components/footer";
import RideGoogleMap from "./page/homePage/components/googleMap";
import Order from "./page/order";
import ResetPassword from "./page/landingPage/component/auth/ResetPassword";
import ForgetPassword from "./page/landingPage/component/auth/ForgetPassword";
import NotInCaliforniaError from "./components/NotInCaliforniaError";

function App() {
  const [usernameFocus, setUsernameFocus] = useState(false);
  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem("access_token");
    return accessToken !== null;
  };

  const handleUsernameFocus = () => {
    setUsernameFocus(true);
  };

  const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? (
      <>{children}</>
    ) : (
      <Navigate to="/error" replace />
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
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
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/map"
            element={
              <PrivateRoute>
                <RideGoogleMap />
              </PrivateRoute>
            }
          />
          <Route path="/not-in-california" element={<NotInCaliforniaError />} />
          <Route
            path="/my-order"
            element={
              <PrivateRoute>
                <Order />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorMessage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
