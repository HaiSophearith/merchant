import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogProps,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { primaryDark } from "../../store/constant";

interface ErrorDialogProps extends DialogProps {
  message: string;
}

const ErrorDialog = ({ message, ...props }: ErrorDialogProps) => {
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
      {...props}
    >
      <DialogContent>
        <DialogContentText
          sx={{ fontWeight: 500, color: `secondary.dark`, display: "block" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CancelIcon
              sx={{ width: "150px", height: "150px", color: "red" }}
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

export default ErrorDialog;
