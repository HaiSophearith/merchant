import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchField = () => {
  return (
    <TextField
      fullWidth
      InputProps={{
        style: {
          borderRadius: "12px",
          width: "250px",
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      placeholder="Search Staff ID, Name"
    />
  );
};
export default SearchField;
