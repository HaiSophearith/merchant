import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { primaryDark } from "../../store/constant";
const SuccessDialog = ({
  open,
  message,
}: {
  open: boolean;
  message: string;
}) => {
  return (
    <Dialog
      sx={{
        "&>div:nth-of-type(3)": {
          justifyContent: "center",
          "&>div": {
            m: 0,
            borderRadius: "12px",
            padding: "20px",
            maxWidth: 600,
            maxHeight: "50%",
          },
        },
        borderRadius: "12px",
      }}
      open={open}
    >
      <DialogContent>
        <DialogContentText
          sx={{
            fontWeight: 500,
            color: `secondary.dark`,
            display: "block",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircleIcon
              sx={{ width: "150px", height: "150px", color: "green" }}
            />
          </Box>

          <Typography
            variant="h3"
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              color: primaryDark,
            }}
          >
            {message}
          </Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
