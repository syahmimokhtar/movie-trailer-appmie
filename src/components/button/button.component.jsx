import React from "react";
import ButtonMUI from "@mui/material/Button";

const Button = ({ children, ...otherProps }) => {
  return (
      <ButtonMUI
          sx={{
            display: 'flex', 
            margin: '10px auto', 
            fontSize: "16px", // Adjust the font size
            padding: "10px 20px", // Adjust the padding
            border: "1px solid white",
            backgroundColor: "#0F1014",
            "&:hover": {
              backgroundColor: "red", // Change color on hover
            },
          }}
          variant="contained"
          {...otherProps}
        >
       {children}       
      </ButtonMUI>
  );
};

export default Button;
