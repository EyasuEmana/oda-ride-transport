import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { MdOutlineSend } from "react-icons/md";

const RSButton = styled(Button)((props) => {
  const {
    theme,
    backgroundcolor,
    txtcolor,
    fontSize,
    radius,
    fontWeight,
    bordercolor,
    borderradius,
    variant,
  } = props;

  const bdrcolor = bordercolor || theme.palette.info.main;

  const getContainedStyle = () => {
    return {
      ...props,
      borderRadius: borderradius,
      backgroundColor: backgroundcolor,
      border: `none`,
      "&:hover": {
        backgroundColor: backgroundcolor,
      },
    };
  };
  const getOutlinedStyle = () => {
    return {
      ...props,
      borderRadius: borderradius,
      borderColor: bdrcolor,
    };
  };

  return {
    borderRadius: radius,
    paddingY: "12px",
    paddingX: "10px",
    fontSize: fontSize,
    color: txtcolor,
    fontWeight: fontWeight,
    "&.Mui-disabled": {
      color: txtcolor,
    },
    ...(variant === "contained" && getContainedStyle()),
    ...(variant === "outlined" && getOutlinedStyle()),
  };
});

RSButton.defaultProps = {
  backgroundcolor: "#FFF",
  borderradius: "5px",
  txtcolor: "light",
  fontWeight: 500,
  fontSize: "12px",
  paddingX: "10px",
  variant: "contained",
  bordercolor: "#FFF",
  radius: "12px",
};
export default RSButton;
