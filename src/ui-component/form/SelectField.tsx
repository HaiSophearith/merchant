import { MenuItem } from "@mui/base";
import { TextField } from "@mui/material";
import React from "react";

interface SelectProps {
  label: string;
  value: string;
}

const SelectField = ({ options }: { options: SelectProps[] }) => {
  return (
    <>
      <TextField
        id="standard-select-currency"
        select
        label="KB PRASAC Branch"
        fullWidth
        InputProps={{
          style: {
            borderRadius: "12px",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};
export default SelectField;
