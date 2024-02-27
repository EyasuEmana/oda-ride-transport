import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

const RSTextField = styled(TextField)((props) => {
  const {} = props;

  return {
    ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
      border: "2px solid #4CB051",
      "&:focus": {
        border: "none",
        boxShadow: "0 0 0 0.2rem rgba(0, 200, 0, 0.2)",
      },
    },
  };
});

RSTextField.defaultProps = {};
export default RSTextField;
