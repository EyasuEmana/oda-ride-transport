import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import colors from "../../assets/theme/colors";

const RSTypography = styled(Typography)((props) => {
  const { fontweight, fontsize, txtcolor } = props;
  return {
    // ...props,
    fontWeight: fontweight,
    fontSize: fontsize,
    color: txtcolor,
  };
});
RSTypography.defaultProps = {
  fontweight: 600,
  fontsize: "15px",
  txtcolor: colors.black.main,
};
export default RSTypography;
