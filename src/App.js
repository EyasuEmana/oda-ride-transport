import HomePage from "./page/homePage/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./page/landingPage/index";
import ErrorMessage from "./components/errorMessage";
import Header from "./components/Appbar";
import theme from "./assets/theme";
import { ThemeProvider } from "@mui/material";
import Footer from "./components/footer";
import RideGoogleMap from "./page/homePage/components/googleMap";
import Order from "./page/order";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/home/:id" element={<HomePage />}></Route>
          <Route path="/map" element={<RideGoogleMap />}></Route>
          <Route path="/my-order" element={<Order/>}></Route>
          <Route path={"*"} element={<ErrorMessage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
