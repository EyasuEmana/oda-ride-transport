import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Stack,
    Button,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";
import Stepper from "./components/stepper/index";
import RideDetailForm from "./components/rideDetailForm";
import ChooseVehicleForm from "./components/chooseVehicleForm";
import ContactDetailForm from "./components/contactDetailForm";
import TripDetail from "./components/tripDetail";
import { useDispatch, useSelector } from "react-redux";
import Summary from "./components/summary";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { book } from "../../store/actions/bookActions";
import Success from "./components/Success";
import { getAllCars } from "../../store/actions/carAction";
import { getExtraOptions } from "../../store/actions/extraOptions";
import { getAirports } from "../../store/actions/airportAction";
import GuestUser from "./components/GuestUser";
import axios from "axios";
import { addMinimumInitialFee, updateTotalFee } from "../../store/reducers/bookReducers";
import { remote_host } from "../../globalVariable";
function Index() {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedTripType, setSelectedTripType] = React.useState();
    const [entryAsGuestOptionPage, setEntryAsGuestOptionPage] = useState(false);
    const [locationChecker, setLocationCkecker] = useState({
        isUnsupportedLocation: false,
        errorMessage: "",
    });

    const [accomAddrChecker, setAccomAddrChecker] = useState({
        isUnsupportedLocation: false,
        errorMessage: "",
    });
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(
        (state) => state.authReducer
    );
    const { fee } = useSelector((state) => state.bookReducer);
    // const phoneRegex = /^(09|07|2519|2517|\+2519|\+2517)\d{8}$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const fullNameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)$/;

    const location = useLocation();
    const navigate = useNavigate();
    const { isBookSuccess, errorMessage, isError, isBookPending } = useSelector(
        (state) => state.bookReducer
    );
    var travelType = location.pathname.split("/").pop();
    const [open, setOpen] = useState(false);

    const [rideInfoValidationSchemaObj, setrideInfoValidationSchemaObj] =
        useState({
            tripType: yup.string("Trip Type").required("Trip type is required!"),
            pickupPhysicalAddress: yup
                .string("Pick up address")
                .required("Pick up address is required!"),
            dropoffPhysicalAddress: yup
                .string("Dropoff address")
                .required("Dropoff address is required!"),
        });

    const rideInfoValidationSchema = yup
        .object()
        .shape(rideInfoValidationSchemaObj);

    const rideValidationSchema = yup.object({
        vehicle: yup
            .string("vehicle is string")
            .required("Select at least one vehicle to proceed"),
        numberOfSuitcases: yup
            .number("suitcase is number")
            .default(0)
            .required("Select at least one suitcases"),
        numberOfPassengers: yup
            .number("passengers is number")
            .default(1)
            .required("Select at least one passengers"),
    });

    const formikRideInfo = useFormik({
        initialValues: {
            tripType: "One-Way",
            pickupPhysicalAddress: "",
            pickupLongitude: 0,
            pickupLatitude: 0,
            dropoffPhysicalAddress: "",
            dropoffLongitude: 0,
            dropoffLatitude: 0,
            distanceInMiles: 0,
            duration: null,
            hour: 1,
            airPortId: null,
            airportName: "",
            airportAddressLongitude: 0,
            airportAddressLatitude: 0,
            hotel: "",
            accommodationAddress: "",
            accommodationLongitude: 0,
            accommodationLatitude: 0,
        },
        validationSchema: rideInfoValidationSchema,
        onSubmit: (values) => {
            if (
                (travelType == "2" || travelType == "3") &&
                !locationChecker.isUnsupportedLocation
            ) {
                handleNext();
            } else if (
                travelType == "1" &&
                !accomAddrChecker.isUnsupportedLocation
            ) {
                handleNext();
            }
        },
    });
    const isRoundTrip = () => {
        var tripType = formikRideInfo.values.tripType;
        return (
            tripType == "Round-Trip" ||
            tripType == "Ride to the airport(round trip)" ||
            tripType == "Ride from the airport(round trip)"
        );
    };

    const tripDetailValidationSchema = yup.object({
        isHourly: yup.boolean().default(location.pathname.split("/").pop() == 3),
        isAirport: yup.boolean().default(location.pathname.split("/").pop() == 1),
        isRoundTripAirport: yup.boolean().default(location.pathname.split("/").pop() == 1 && isRoundTrip()),

        isRoundTrip: yup.boolean().default(isRoundTrip()),
        additionalStopId: yup.number().default(0),
        additionalStopOnTheWayDescription: yup.string().when("additionalStopId",
            {
                is: (value) => value > 0,
                then: () => yup.string().required("description required"),
                otherwise: () => yup.number().default(0)
            }
        ),
        formattedPickupDate: yup
            .string("should be string value")
            .required("Pickup date is required"),
        formattedPickupTime: yup
            .string("should be string value")
            .required("Pickup time is required"),
        formattedReturnPickupDate: yup.string().when("isRoundTrip", {
            is: true,
            then: (schema) => schema.required("Return pickup date is required"),
            otherwise: (schema) => schema.nullable(true),
        }),
        formattedReturnPickupTime: yup.string().when("isRoundTrip", {
            is: true,
            then: (schema) => schema.required("Return pickup time is required"),
            otherwise: (schema) => schema.nullable(true),
        }),
        instruction: yup
            .string("special instruction shoud be string")
            .nullable(true),

        pickupPreference: yup.number().required("preference require"),
        // .required("special instruction is required"),
        occation: yup.string().when("isHourly", {
            is: true,
            then: (schema) => schema.required("Occation is required"),
            otherwise: (schema) => schema,
        }),
        returnFlightNumber: yup.string().when("isRoundTripAirport", {
            is: true,
            then: (schema) => schema.required("flight number is required"),
            otherwise: (schema) => schema,
        }),

        returnAirline: yup.string().when("isRoundTripAirport", {
            is: true,
            then: (schema) => schema.required("airline is required"),
            otherwise: (schema) => schema,
        }),
    });

    const formikChooseVehicle = useFormik({
        initialValues: {
            vehicle: null,
            vehicleFee: 0,
            prevCarMinimumStartFee: 0,
            vehicleName: "",
            numberOfSuitcases: 0,
            numberOfPassengers: 1,
            extraOptions: [],
            pricePerMile: 0,
            minimumStartFee: 0,
            extraOptionFee: 0
        },
        validationSchema: rideValidationSchema,
        onSubmit: (values) => {
            handleNext();
        },
    });

    const formikTripDetail = useFormik({
        initialValues: {
            tripType: location.pathname.split("/").pop() == 3,
            formattedPickupDate: null,
            pickupDate: null,
            formattedPickupTime: null,
            pickupTime: null,
            formattedReturnPickupDate: null,
            returnPickupDate: null,
            formattedReturnPickupTime: null,
            returnPickupTime: null,
            additionalStopOnTheWayPrice: 0,
            additionalStopId: 0,
            additionalStopOnTheWayDescription: "",
            instruction: "",
            arrivalFlightNumber: "",
            airline: "",
            returnFlightNumber: "",
            returnAirline: "",
            occation: "",
            pickupPreference: 1,
            prevPickupPrefValue: 0,
            pickupPreferenceFee: 0,
            prevAddtionalStopOnTheWayFee: 0,
            stopOnWayFee: 0,

        },
        validationSchema: tripDetailValidationSchema,
        onSubmit: (value) => {
            handleNext();
            if (!isAuthenticated) setEntryAsGuestOptionPage(true);
        },
    });
    const contactValidationSchema = yup.object().shape({
        firstName: yup.string("should be string") /* .required() */,
        lastName: yup.string("should be string") /* .required() */,
        isValidCardInfo: yup
            .boolean()
            .oneOf([true], "Please, validate your card Info!"),
        email: yup.string().email("invalid email").required("email required"),
        /* .required("Email required") */
        // confirmEmail: yup
        // .string()
        // .oneOf([yup.ref("email"), null], "Emails must match"),
        cellPhone: yup.string(),
    /* .matches(phoneRegex, "Invalid phone number format") */ 
    passengerFullName:
            yup.string()
                .matches(fullNameRegex, "invalid full name")
                .required("full name required"),
        // passengerLastName: yup.string(),
        passengerCellPhone: yup
            .string()
            .matches(phoneRegex, "Invalid phone number format")
            .required("phone num. required"),
        isGuestBooking: yup.boolean(),
        // guestEmail: yup
        //   .string("should be string")
        //   .email("should be valid email")
        //   .when("isGuestBooking", {
        //     is: true,
        //     then: (schema) =>
        //       yup
        //         .string("should be string")
        //         .email("should be valid email")
        //         .required("guest email is required"),
        //     otherwise: (schema) =>
        //       yup.string("should be string").email("should be valid email"),
        //   }),
    });
    const formikContact = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            confirmEmail: "",
            number: "",
            expiry: "",
            zipCode: "",
            cvc: "",
            name: "",
            isValidCardInfo: false,
            cellPhone: "",
            bookingFor: "Myself",
            passengerFullName: "",
            passengerCellPhone: "",
            isGuestBooking: false,
            entryOptionSelected: false,
            creditCardNumber: "",
            cardOwnerName:"",
            expirationDate: "",
            securityCode: "",
            gratuityId: 1,
            gratuityFee: 0,
            prevGratuityFee: 0,
            feeBeforeGratuity: 0,
        },
        validationSchema: contactValidationSchema,
        onSubmit: () => {
            handleNext();
        },
    });
    const formikSummary = useFormik({
        initialValues: {
            concent: false,
        },
        validationSchema: yup.object({
            concent: yup.boolean().oneOf([true], "You should concent to the summary"),
        }),
        onSubmit: (value) => {
            handleFinish();
        },
    });
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChangeTripType = (event) => {
        // formikTripDetail.resetForm();
        const selectedType = event.target.value;
        navigate(`/home/${selectedType}`);
        setSelectedTripType(selectedType);
    };

    function setRideDetailFormikData() {
        if (travelType == 2) {
            setrideInfoValidationSchemaObj({
                isUnsupportedLocation: false,
                isUnsupportedDropoffAddr: false,
                isUnsupportedPickupAddr: false,
                tripType: yup.string("Trip Type").required("Trip type is required!"),
                pickupPhysicalAddress: yup
                    .string("Pick up address")
                    .required("Pick up address is required!"),
        /*  .when("isUnsupportedLocation", {
            is: true,
            then: yup
              .string("")
              .required("not providing service at the selected address"),
            otherwise: yup.string(""),
          }) */ dropoffPhysicalAddress: yup
                    .string("Dropoff address")
                    .required("Dropoff address is required!"),
                /* .when("isUnsupportedLocation", {
                    is: true,
                    then: (schema) =>
                      schema.required(
                        yup.ref("isUnsupportedLocation")
                          ? "not providing service at the selected address"
                          : "Dropoff address is required!"
                      ),
                    otherwise: (schema) => schema,
                  }) */
            });
        } else if (travelType == 1) {
            setrideInfoValidationSchemaObj({
                tripType: yup.string("Trip Type").required("Trip type is required!"),
                airPortId: yup.string("airport").required("Airport required!"),
                hotel: yup.string("Hotel is string").required("Hotel is required!"),
            });
        } else if (travelType == 3) {
            setrideInfoValidationSchemaObj({
                isUnsupportedLocation: false,
                pickupPhysicalAddress: yup
                    .string("Pick up address")
                    .required("Pick up address is required!"),
        /*  .when("isUnsupportedLocation", {
            is: true,
            then: (schema) =>
              schema.required("not providing service at the selected address"),
            otherwise: (schema) => schema,
          }) */ dropoffPhysicalAddress: yup
                    .string("Dropoff address")
                    .required("Dropoff address is required!"),
        /* .when("isUnsupportedLocation", {
            is: true,
            then: (schema) =>
              schema.required(
                yup.ref("isUnsupportedLocation")
                  ? "not providing service at the selected address"
                  : "Dropoff address is required!"
              ),
            otherwise: (schema) => schema,
          }) */ hour: yup
                    .string("Hour to travel")
                    .required("Hour is required!"),
            });
        }
    }

    const handleFinish = () => {
        const values = {
            rideInfo: formikRideInfo.values,
            vehicle: formikChooseVehicle.values,
            tripDetail: formikTripDetail.values,
            contact: formikContact.values,
            travelType: location.pathname.split("/").pop(),
        };
        dispatch(book(values));
    };

    const handleSubmit = () => {
        switch (activeStep) {
            case 0:
                formikRideInfo.handleSubmit();
                break;
            case 1:
                formikChooseVehicle.handleSubmit();
                break;
            case 2:
                formikTripDetail.handleSubmit();
                break;
            case 3:
                formikContact.handleSubmit();
                break;
            case 4:
                formikSummary.handleSubmit();
                break;
            default:
                break;
        }
    };

    const getNextButtonLabel = () => {
        switch (activeStep) {
            case 0:
                return "CHOOSE VEHICLE";
            case 1:
                return "TRIP DETAIL";
            case 2:
                return "CONTACT DETAIL";
            case 3:
                return "SUMMARY";
            case 4:
                return "BOOK";
            default:
                break;
        }
    };

    const generateVehicleSummaryData = () => {
        const vehicle = formikChooseVehicle.values;
        const summaryDataTemp = [
            { label: "Suitcases", value: vehicle.numberOfSuitcases, isVisible: true },
            {
                label: "Passengers",
                value: vehicle.numberOfPassengers,
                isVisible: true,
            },
            { label: "Vehicle", value: vehicle.vehicleName, isVisible: true },
        ];
        var extraOptions = [];
        vehicle?.extraOptions?.map((option) => {
            extraOptions.push({
                label: option.name,
                value: option.quantity,
                isVisible: true,
            });
        });
        summaryDataTemp.push(...extraOptions);
        return summaryDataTemp;
    };

    const generateTripSummaryData = () => {
        const tripSummaryData = [
            {
                label: "Pickup date",
                value:
                    formikTripDetail.values.formattedPickupDate +
                    " " +
                    formikTripDetail.values.formattedPickupTime,
                isVisible: true,
            },
            {
                label: "Special instr.",
                value: formikTripDetail.values.instruction,
                isVisible: true,
            },
        ];

        return tripSummaryData;
    };
    const generateContactSummaryData = () => {
        const contactSummaryData = [
            {
                label: "Passenger Full Name",
                value: formikContact.values.passengerFullName,
                isVisible: true,
            },
            {
                label: "Phone num.",
                value: formikContact.values.passengerCellPhone,
                isVisible: true,
            },
        ];
        return contactSummaryData;
    };

    useEffect(() => {
        setRideDetailFormikData();
    }, [location]);

    useEffect(() => {
        if (isBookSuccess) {
            handleNext();
        }
        if (isError) setOpen((prev) => !prev);
    }, [isBookSuccess, errorMessage, isError]);
    const addMinFee = async () => {
        try {
            await axios.get(`${remote_host}/api/v1/minimum-start-fee`).then((res) => {
                const minimumFee = parseFloat(res.data.fee);
                console.log("min fee: ", minimumFee);

                dispatch(addMinimumInitialFee(minimumFee));
            });
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const feeCalculator = () => {

        var totalFee = 0

        const { vehicleFee,
            minimumStartFee,
            extraOptionFee } = formikChooseVehicle.values

        const { distanceInMiles, hour } = formikRideInfo.values

        const { stopOnWayFee, pickupPreferenceFee } = formikTripDetail.values
        const gratuityFee = formikContact.values.gratuityFee
        if (travelType === "1" || travelType === "2") {
            if (isRoundTrip()) {
                totalFee = totalFee + vehicleFee * distanceInMiles * 2
            } else {
                totalFee = totalFee + vehicleFee * distanceInMiles
            }

        } else if (travelType === "3") {
            totalFee = totalFee + vehicleFee * hour;
        }
        const totalMinFee = isRoundTrip() ? minimumStartFee * 2 : minimumStartFee
        totalFee =
            totalFee + extraOptionFee + totalMinFee +
            stopOnWayFee + pickupPreferenceFee + gratuityFee;

        dispatch(updateTotalFee(totalFee));

    }

    useEffect(() => {
        feeCalculator()

    }, [formikContact,
        formikChooseVehicle,
        formikRideInfo,
        formikTripDetail])

    useEffect(() => {
        dispatch(getAllCars());
        dispatch(getAirports());
        dispatch(getExtraOptions());
        addMinFee();
    }, []);

    return (
        <Box>
            {entryAsGuestOptionPage &&
                !isAuthenticated &&
                !formikContact.values.entryOptionSelected ? (
                <GuestUser
                    setEntryAsGuestOptionPage={setEntryAsGuestOptionPage}
                    formik={formikContact}
                />
            ) : (
                <Box mt={5}>
                    <Stepper step={activeStep} />
                    <Grid container justifyContent={"center"} mt={5}>
                        <Grid item xs={10}>
                            <Box>
                                {activeStep === 0 && (
                                    <RideDetailForm
                                        formik={formikRideInfo}
                                        handleChangeTripType={handleChangeTripType}
                                        locationChecker={locationChecker}
                                        setLocationCkecker={setLocationCkecker}
                                        accomAddrChecker={accomAddrChecker}
                                        setAccomAddrChecker={setAccomAddrChecker}
                                        selectedTripType={selectedTripType}
                                    />
                                )}
                                {activeStep === 1 && (
                                    <ChooseVehicleForm
                                        hour={formikRideInfo.values.hour}
                                        distanceInMiles={formikRideInfo.values.distanceInMiles}
                                        formik={formikChooseVehicle}
                                        rideSummaryData={formikRideInfo.values}
                                    />
                                )}
                                {activeStep === 2 && (
                                    <TripDetail
                                        formik={formikTripDetail}
                                        rideSummaryData={formikRideInfo.values}
                                        vehicleSummaryData={generateVehicleSummaryData()}
                                    />
                                )}
                                {activeStep === 3 && (
                                    <ContactDetailForm
                                        formik={formikContact}
                                        rideSummaryData={formikRideInfo.values}
                                        vehicleSummaryData={generateVehicleSummaryData()}
                                        tripSummaryData={generateTripSummaryData()}
                                    />
                                )}
                                {activeStep === 4 && (
                                    <Summary
                                        formik={formikSummary}
                                        rideSummaryData={formikRideInfo.values}
                                        vehicleSummaryData={generateVehicleSummaryData()}
                                        tripSummaryData={generateTripSummaryData()}
                                        contactSummaryData={generateContactSummaryData()}
                                    />
                                )}
                                {activeStep === 5 && <Success />}
                            </Box>
                        </Grid>
                        {activeStep !== 5 && (
                            <Grid item xs={10} mt={3}>
                                <Stack
                                    direction={"row"}
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                >
                                    <Button
                                        variant="outlined"
                                        onClick={handleBack}
                                        disabled={activeStep === 0}
                                        color="secondary"
                                    >
                                        BACK
                                    </Button>
                                    <Button variant="contained" onClick={handleSubmit}>
                                        {isBookPending ? (
                                            <CircularProgress size={25} sx={{ color: "#FFF" }} />
                                        ) : (
                                            getNextButtonLabel()
                                        )}
                                    </Button>
                                    {/* )} */}
                                </Stack>
                            </Grid>
                        )}
                    </Grid>

                    <Snackbar
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        open={open}
                        onClose={() => setOpen((prev) => !prev)}
                        key={"bottom" + "left"}
                        autoHideDuration={3000}
                    >
                        <Alert
                            onClose={() => setOpen((prev) => !prev)}
                            severity="error"
                            variant="filled"
                            sx={{ width: "100%" }}
                        >
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            )}
        </Box>
    );
}

export default Index;
