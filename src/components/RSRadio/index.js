import React, { useEffect } from "react";
import { Radio, useTheme } from "@mui/material";
import { GiCheckMark } from "react-icons/gi";
import { MdRadioButtonUnchecked } from "react-icons/md";
export default function TripRadio(props) {
  const theme = useTheme();

  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<GiCheckMark style={{ color: theme.palette.info.main }} />}
      icon={<MdRadioButtonUnchecked />}
      {...props}
    />
  );
}
