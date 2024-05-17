import React, { SyntheticEvent } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  error,
  lineGray,
  primaryDark,
  primaryLight,
} from "../../../store/constant";
import { ButtonComponent } from "../../CustomizeComponent";

interface SelectUserProps {
  open: boolean;
  handleCloseDialog: (e: SyntheticEvent) => void;
}

const DeleteRoleModal = ({ open, handleCloseDialog }: SelectUserProps) => {
  return (
    <Dialog
      sx={{
        "&>div:nth-of-type(3)": {
          justifyContent: "center",
          "&>div": {
            m: 0,
            borderRadius: "12px",
            padding: "10px",
            maxWidth: 450,
            maxHeight: "50%",
          },
        },
      }}
      open={open}
      onClose={handleCloseDialog}
    >
      {open && (
        <>
          <DialogTitle>
            <Typography sx={{ fontWeight: "14px" }} variant="h5">
              Delete
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6">
              Are you sure you want to delete this Role?
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <ButtonComponent
                sx={{
                  color: primaryDark,
                  backgroundColor: primaryLight,
                  width: "135px",
                  border: "1.5px solid",
                  borderColor: lineGray,
                }}
              >
                Cancel
              </ButtonComponent>
              <ButtonComponent
                sx={{
                  backgroundColor: error,
                  color: primaryLight,
                  width: "135px",
                }}
              >
                Delete
              </ButtonComponent>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};
export default DeleteRoleModal;
