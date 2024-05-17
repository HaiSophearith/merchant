import { TextField } from "@mui/material";
import React from "react";
const TextInputField = ({ label }: { label: string }) => {
  return (
    <>
      <TextField
        sx={{ marginRight: "24px" }}
        id="outlined-basic"
        label={label}
        fullWidth
        variant="outlined"
        InputProps={{
          style: {
            borderRadius: "12px",
          },
        }}
      />
    </>
  );
};
export default TextInputField;
