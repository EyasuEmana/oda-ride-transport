import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCol,
  CContainer,
  CFormInput,
  CFormSelect,
  CFormSwitch,
  CImage,
  CNav,
  CNavItem,
  CRow,
} from "@coreui/react";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import carAvatar from "../../../../assets/images/car_Avatar.jpg";
import Constants12 from "./../../../../components/constants12";

const CarDetails = () => {
  const location = useLocation();
  const {
    carId,
    carName,
    carImageUrl,
    carDescription,
    maxSuitcases,
    carType,
    pricePerMile,
    currency,
    engineType,
    length,
    interiorColor,
    exteriorColor,
    power,
    transmissionType,
    fuelType,
    extras,
  } = location.state?.rowData || {};

  return (
    <CContainer className="min-vh-100 my-4 px-4">
      <CContainer
        className="shadow-sm p-0"
        style={{
          display: "flex",
          fontFamily: "Roboto",
          flexDirection: "column",
          height: "85vh",
          background: "white",
          // backgroundColor: "green",
          marginTop: "-5px",
          overflow: "auto",
        }}
      >
        <CContainer
          className="px-4"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // backgroundColor: "green",
            width: "600px",
            fontFamily: "Roboto",
          }}
        >
          {
            <CContainer
              className="p-0 m-0  d-flex align-items-center justify-content-center"
              style={{
                height: "180px",
                width: "270px",
                alignItems: "center",
                // backgroundColor: "green",
                // borderRadius: "100px",
              }}
            >
              {carImageUrl === null ? (
                <CAvatar
                  style={{
                    flex: "1",
                    width: "100%",
                    height: "100%",
                    fontSize: "35px",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    background: "linear-gradient(#00adef, black)",
                  }}
                  textColor="white"
                  src={carAvatar}
                />
              ) : (
                <CImage
                  style={{
                    flex: "1",
                    
                    width: "100%",
                    height: "100%",
                    // borderRadius: "100px",
                  }}
                  src={carImageUrl}
                />
              )}
            </CContainer>
          }

          {/* <CContainer style={{ marginTop: "-12%", marginLeft: "0px" }}>
                <CCardText
                  style={{
                    // color: "black",
                    fontSize: "25px",
                    fontFamily: "inherit",
                    fontWeight: "bold",
                  }}
                >
                  {carType}
                </CCardText>
                <CCardText
                  style={{
                    // color: "black",
                    marginTop: "-4%",
                    fontSize: "18px",
                    fontFamily: "Roboto",
                  }}
                >
                  {carDescription}
                </CCardText>
              </CContainer>
              */}
        </CContainer>
        <CContainer className="m-0 mt-4 p-0  d-flex flex-row">
          <CContainer style={{ width: "65%" }} className="">
            <CCard style={{ border: "none" }} className="shadow-sm">
              <CCardHeader
                style={{
                  border: "none",
                  color: Constants12.cyanblue,
                  // textAlign: "center",
                }}
              >
                Car Information
              </CCardHeader>
              <CCardBody
                className="m-0 mt-4 p-0"
                style={{
                  fontSize: "12px",
                  // backgroundColor: "green"
                }}
              >
                <CContainer className="d-flex flex-row p-0 m-0">
                  <CContainer className="w-50 m-0 p-0 mx-3">
                    <CContainer>
                      <strong>CarId</strong>
                      <p>{carId}</p>
                    </CContainer>
                    <CContainer>
                      <strong>Car Type</strong>
                      <p>{carType}</p>
                    </CContainer>
                    <CContainer>
                      <strong>Car Name</strong>
                      <p>{carName}</p>
                    </CContainer>
                    <CContainer>
                      <strong>Car Description</strong>
                      <p>{carDescription}</p>
                    </CContainer>
                    <CContainer>
                      <strong>Max Suitcases</strong>
                      <p>{maxSuitcases}</p>
                    </CContainer>
                    <CContainer>
                      <strong>Price PerMile</strong>
                      <p>{pricePerMile}</p>
                    </CContainer>
                    <CContainer>
                      <strong>Currency</strong>
                      <p>{currency}</p>
                    </CContainer>
                    <CContainer>
                      <strong>Engine Type</strong>
                      <p>{engineType}</p>
                    </CContainer>
                    <CContainer>
                      <strong>Length</strong>
                      <p>{length}</p>
                    </CContainer>
                    <CContainer>
                      <strong>Interior Color</strong>
                      <p>{interiorColor}</p>
                    </CContainer>
                    <CContainer>
                      <strong>Exterior Color</strong>
                      <p>{exteriorColor}</p>
                    </CContainer>
                  </CContainer>
                  <CContainer className="w-50 m-0 p-0" >
                    <CContainer>
                      <strong>Power</strong>
                      {/* <p style={{ color: "yellow" }}>{power}</p> */}

                      <p >{power}</p>
                    </CContainer>
                    <CContainer>
                      <strong>Transmission Type</strong>
                      <p>{transmissionType}</p>
                    </CContainer>
                    <CContainer>
                      <strong>Fuel Type</strong>
                      <p>{fuelType}</p>
                    </CContainer>
                    <CContainer>
                      <strong>Extras</strong>
                      <p>{extras}</p>
                    </CContainer>
                  </CContainer>
                </CContainer>
              </CCardBody>
            </CCard>
          </CContainer>
        </CContainer>
      </CContainer>
    </CContainer>
  );
};

export default CarDetails;
