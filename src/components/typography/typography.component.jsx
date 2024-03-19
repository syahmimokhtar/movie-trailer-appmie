import React from "react";
import TypographyMUI from "@mui/material/Typography";

const Typography = ({children, ...otherProps} ) => {
  const typoSettings = {
    color: "white",
    fontSize: "22x",
    fontWeight: 700,
  };

  return (
    <TypographyMUI
      sx={typoSettings}
      gutterBottom
      variant="h5"
      align="center"
      noWrap={true}
      component="div"
      {...otherProps}
    >

    {children}
     
    </TypographyMUI>
  );
};

export default Typography;
