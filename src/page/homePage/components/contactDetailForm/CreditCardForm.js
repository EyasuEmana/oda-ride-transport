import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import { CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { remote_host } from "../../../../globalVariable";

const CreditCardForm = ({ formik }) => {
  const [errorResponse, setErrorresponse] = useState({
    isError: false,
    errorMessage: "",
  });
  const [successResponse, setSuccessresponse] = useState({
    isSuccess: false,
    isLoading: false,
    successMessage: "",
  });
  const [cardInfo, setCardInfo] = useState({
    number: "",
    zipCode: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "expiry") {
      // Allow only digits and "/"
      const regex = /^(\d{0,2})(\/?)(\d{0,2})$/;
      const match = value.match(regex);

      if (match) {
        let formattedValue = match[1];
        if (match[2]) formattedValue += "/";
        if (match[3]) formattedValue += match[3];

        // Validate MM and ensure YY is numeric
        if (
          formattedValue.length <= 5 &&
          (formattedValue.length < 2 || (parseInt(match[1]) >= 1 && parseInt(match[1]) <= 12))
        ) {
          setCardInfo((prev) => ({ ...prev, [name]: formattedValue }));
          formik.setFieldValue(name, formattedValue);
        }
      }
    } else {
      setCardInfo((prev) => ({ ...prev, [name]: value }));
      formik.setFieldValue(name, value);
    }
  };

  const handleInputFocus = (e) => {
    setCardInfo((prev) => ({ ...prev, focus: e.target.name }));
  };

  function formatDateString(inputString) {
    // Ensure MM/YY format
    if (inputString.length === 4 && !inputString.includes("/")) {
      return `${inputString.slice(0, 2)}/${inputString.slice(2)}`;
    }
    return inputString;
  }

  const handleCardInfoSubmit = async (e) => {
    e.preventDefault();
    const body = {
      creditCardNumber: cardInfo.number,
      cardOwnerName: cardInfo.name,
      expirationDate: formatDateString(cardInfo.expiry),
      securityCode: cardInfo.cvc,
      zipCode: cardInfo.zipCode,
    };

    setSuccessresponse((prev) => ({ ...prev, isLoading: true }));
    await axios
      .post(`${remote_host}/api/v1/users/payment-detail/validate-card`, body)
      .then((result) => {
        if (result.data) {
          formik.setFieldValue("isValidCardInfo", true);
          formik.setFieldValue("creditCardNumber", cardInfo.number);
          formik.setFieldValue("cardOwnerName", cardInfo.name);
          formik.setFieldValue(
            "expirationDate",
            formatDateString(cardInfo.expiry)
          );
          formik.setFieldValue("zipCode", cardInfo.zipCode);
          formik.setFieldValue("securityCode", cardInfo.cvc);
          setErrorresponse((prev) => ({ ...prev, isError: false }));
          setSuccessresponse({
            isSuccess: true,
            successMessage: result.data.message,
          });
        }
      })
      .catch((error) => {
        setSuccessresponse((prev) => ({ ...prev, isSuccess: false }));
        if (error?.response) {
          setErrorresponse({
            isError: true,
            errorMessage: error.response.data.message,
          });
        } else {
          setErrorresponse({
            isError: true,
            errorMessage: "Network Error!",
          });
        }
      });
    setSuccessresponse((prev) => ({ ...prev, isLoading: false }));
  };

  return (
    <div>
      <Cards
        number={cardInfo.number}
        expiry={cardInfo.expiry}
        cvc={cardInfo.cvc}
        name={cardInfo.name}
        focused={cardInfo.focus}
      />
      <div className="mt-3">
        <form onSubmit={handleCardInfoSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name on Card"
              value={cardInfo.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="number"
              className="form-control"
              placeholder="Card Number"
              value={cardInfo.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
          </div>

          <div className="row">
            <div className="col-6 mb-3">
              <input
                type="text"
                name="expiry"
                className="form-control"
                placeholder="MM/YY"
                value={cardInfo.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </div>

            <div className="col-6 mb-3">
              <input
                type="number"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3,4}"
                value={cardInfo.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="zipCode"
              className="form-control"
              placeholder="Zip Code"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              pattern="^\d{5}(-\d{4})?$"
              title="Please enter a valid US zip code (XXXXX or XXXXX-XXXX)"
              required
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-dark">
              {successResponse.isLoading ? (
                <CircularProgress size={20} sx={{ color: "#FFF" }} />
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </form>
      </div>
      {errorResponse.isError && (
        <Alert severity="error" variant="filled" sx={{ width: "100%", mt: 3 }}>
          {errorResponse.errorMessage}
        </Alert>
      )}
      {successResponse.isSuccess && (
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%", mt: 3 }}
        >
          {successResponse.successMessage}
        </Alert>
      )}
      {formik.touched.isValidCardInfo && formik.errors.isValidCardInfo && (
        <span style={{ color: "#F00" }}>{formik.errors.isValidCardInfo}</span>
      )}
    </div>
  );
};

export default CreditCardForm;
