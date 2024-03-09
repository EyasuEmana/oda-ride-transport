import React, { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  IconButton,
  useTheme,
  Box,
} from "@mui/material";
import RSTypography from "../../../../components/RSTypography";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import RSButton from "../../../../components/RSButton";

function ExtraOptionComponent({ option, formik }) {
  const { name, description, pricePerItem } = option;
  const [isSelected, setIsSelected] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const theme = useTheme();

  const handleAddItem = () => {
    if (option?.counter !== option?.maxAllowedItems) {
      option.counter = option.counter + 1;
      setQuantity((prev) => prev + 1);
      var options = [...formik.values.extraOptions];
      const optionIndex = options.findIndex(
        (opt) => opt.extraOptionId === option.extraOptionId
      );
      if (optionIndex !== -1) {
        options[optionIndex] = {
          ...options[optionIndex],
          quantity: options[optionIndex].quantity + 1,
        };
      } else {
        options.push({
          extraOptionId: option?.extraOptionId,
          quantity: 1,
        });
      }
      formik.setFieldValue("extraOptions", options);
    }
  };

  const handleReduceItem = () => {
    if (option?.counter !== 0) {
      option.counter = option.counter - 1;
      setQuantity((prev) => prev - 1);
    }
  };
  const handleSelect = () => {
    var options = [...formik.values.extraOptions];
    const optionIndex = options.findIndex(
      (opt) => opt.extraOptionId === option.extraOptionId
    );
    if (optionIndex !== -1) {
      options[optionIndex] = {
        ...options[optionIndex],
        quantity: 1,
      };
    }
    formik.setFieldValue("extraOptions", options);
    setQuantity(1);
    setIsSelected((prev) => !prev);
  };

  const handleUnselect = () => {
    var options = [...formik.values.extraOptions];
    const indexToRemove = options.findIndex(
      (opt) => opt.extraOptionId === option.extraOptionId
    );
    if (indexToRemove !== -1) {
      options.splice(indexToRemove, 1);
    }
    setQuantity(0);
    formik.setFieldValue("extraOptions", options);
    setIsSelected((prev) => !prev);
  };
  useEffect(() => {
    option.counter = 0;
  }, []);
  return (
    <Grid
      item
      container
      alignItems={"center"}
      spacing={{ xs: 2, md: 0 }}
      sx={{ padding: 1, backgroundColor: "#EEE" }}
    >
      <Grid item sm={12} md={6}>
        <RSTypography fontsize={20}>
          {name} - {<span style={{ color: "#03930A" }}>${pricePerItem}</span>}
        </RSTypography>
        <Typography>{description}</Typography>
      </Grid>

      <Grid
        item
        container
        sm={12}
        md={6}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={1}
      >
        <Grid item xs={5}>
          <Stack
            direction={"column"}
            spacing={2}
            sx={{ backgroundColor: "#FFF", padding: 1 }}
          >
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography>Number</Typography>
              <Typography> {quantity}</Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-around"}>
              <IconButton
                onClick={handleReduceItem}
                disabled={!isSelected || (isSelected && quantity === 1)}
              >
                <FaArrowAltCircleLeft size={20} />
              </IconButton>
              <IconButton
                onClick={handleAddItem}
                disabled={!isSelected || option?.maxAllowedItems == quantity}
              >
                <FaArrowAltCircleRight size={20} />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={5}>
          {isSelected ? (
            <RSButton
              backgroundcolor={"#FF0013"}
              txtcolor={"#FFF"}
              sx={{ width: 200 }}
              onClick={handleUnselect}
            >
              Selected
            </RSButton>
          ) : (
            <RSButton
              sx={{ width: 200 }}
              variant="outlined"
              txtcolor={theme.palette.warning.main}
              bordercolor={theme.palette.warning.main}
              onClick={handleSelect}
            >
              select
            </RSButton>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ExtraOptionComponent;
