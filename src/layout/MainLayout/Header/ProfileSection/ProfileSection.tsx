import Profile from "../../../../assets/images/profiles/profile.svg";
import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
const ProfileSection = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{ display: "block", justifyContent: "flex-end", margin: "0 8px" }}
      >
        <Typography variant="h6">David Ly</Typography>
        <Typography variant="subtitle2">Super Admin</Typography>
      </Box>
      <Avatar
        sx={{
          width: "60px",
          height: "60px",
          margin: "8px 0 8px 8px",
          cursor: "pointer",
        }}
        src={Profile}
      />
    </Box>
  );
};
export default ProfileSection;
