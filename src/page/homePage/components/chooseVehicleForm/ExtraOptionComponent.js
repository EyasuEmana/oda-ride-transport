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
    if (quantity !== option?.maxAllowedItems) {
      setQuantity((prev) => prev + 1);
      var options = [...formik.values.extraOptions];
      const extraOptionSize = formik.values.extraOptions.length;
      const optionIndex = options.findIndex(
        (opt) => opt.extraOptionId === option.extraOptionId
      );

      options[optionIndex] = {
        ...options[optionIndex],
        quantity: options[optionIndex].quantity + 1,
      };

      formik.setFieldValue("extraOptions", options);
    }
  };

  const handleReduceItem = () => {
    if (quantity !== 0) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleSelect = () => {
    var options = [...formik.values.extraOptions];
    const extraOptionSize = formik.values.extraOptions.length;
    options[extraOptionSize] = {
      extraOptionId: option.extraOptionId,
      name: option.name,
      quantity: 1,
    };
    formik.setFieldValue("extraOptions", options);
    setQuantity(1);
    setIsSelected((prev) => !prev);
  };

  const handleUnselect = () => {
    var options = [...formik.values.extraOptions];
    const indexToRemove = options.findIndex(
      (opt) => opt.extraOptionId === option.extraOptionId
    );
    options.splice(indexToRemove, 1);
    setQuantity(0);
    formik.setFieldValue("extraOptions", options);
    setIsSelected((prev) => !prev);
  };

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
                onClick={() => handleAddItem()}
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
