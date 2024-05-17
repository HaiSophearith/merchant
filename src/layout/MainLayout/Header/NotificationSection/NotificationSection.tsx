import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import React from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const NotificationSection = () => (
  <Link component={RouterLink} to={"/"} aria-label="theme-logo">
    <NotificationsActiveIcon />
  </Link>
);

export default NotificationSection;
