import colors from "../colors";
const commonStyles = {
  fontFamily: "Inter",
  fontStyle: "normal",
  boxShadow: "none",
  textTransform: "capitalize",
};
const button = {
  //   defaultProps: {
  //     disableRipple: true,
  //   },
  styleOverrides: {
    outlined: {
      ...commonStyles,
      borderColor: colors.info.main,
      color: colors.info.main,
      "&:hover": {
        borderColor: colors.info.light,
        color: colors.info.light,
      },
    },
    contained: {
      ...commonStyles,
      backgroundColor: colors.info.main,

      color: colors.text.main,
      "&:hover": {
        boxShadow: "none",
        backgroundColor: colors.info.light,
        color: colors.text.light,
      },
      "&:disabled": {
        boxShadow: colors.grey[200],
      },
    },
  },
};

export default button;
