import { createTheme } from "@mui/material";
import colors from "./colors";
import button from "./components/button";
function CustomTheme() {
  return createTheme({
    // direction: "ltr",
    palette: {
      ...colors,
    },
    typography: {
      fontFamily: "Inter",
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 930,
        lg: 1200,
        xl: 1536,
        custom: 2000,
      },
    },
    components: {
      MuiButton: { ...button },
    },
  });
}
export default CustomTheme;
