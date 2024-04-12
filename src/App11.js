import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cars from "./page/UserManagement/DataTable/Car/Car";
import EtraOptions from "./page/UserManagement/DataTable/ExtraOption/EtraOption";
import PointToPointBooks from "./page/UserManagement/DataTable/PointToPointBook/PointToPointBook";
import Users from "./page/UserManagement/DataTable/User/User";
import { QueryClient, QueryClientProvider } from "react-query";
import { Grid } from "@mui/material";
import Header from "./components/Appbar";
import Footer from "./components/footer";
import Dashboard from "./components/Dashboard/Dashboard";
function App() {
  const queryClient = new QueryClient();
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} mt={2}>
      <Grid item sm={12}>
        <BrowserRouter>
          <Header />
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Users />} />
              {/* <Route path="/signup" element={<Registration />} />
              <Route element={<PrivateRoutes />}> */}
              <Route path="/dashboard" name="dashboard" element={<Dashboard />}>
                <Route index element={<Cars />}></Route>
                <Route path={"Cars"} element={<Cars />}></Route>
                <Route path={"EtraOptions"} element={<EtraOptions />}></Route>
                <Route
                  path={"PointToPointBooks"}
                  element={<PointToPointBooks />}
                ></Route>
              </Route>
              {/* </Route> */}
            </Routes>
          </QueryClientProvider>
          <Footer />
        </BrowserRouter>
      </Grid>
    </Grid>
  );
}
export default App;
