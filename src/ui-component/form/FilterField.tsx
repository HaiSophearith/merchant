import React from "react";
import { IconChevronDown } from "@tabler/icons";
import { Select } from "@mui/material";

const options = [
  { id: 1, label: "Role1", value: "Role 1" },
  { id: 2, label: "Role2", value: "Role2" },
];

const FilterField = () => {
  return (
    <>
      <Select
        sx={{ borderRadius: "12px" }}
        fullWidth
        IconComponent={IconChevronDown}
        native
        defaultValue="none"
      >
        <option value="none" disabled>
          Role
        </option>
        {options.map((option) => {
          return <option value={option.value}>{option.label}</option>;
        })}
      </Select>
    </>
  );
};
export default FilterField;
