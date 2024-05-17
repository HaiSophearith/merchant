import React, { SyntheticEvent } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Filter from "../form/FilterField";
import {
  lineGray,
  orangeMain,
  primaryDark,
  primaryLight,
} from "../../store/constant";
import { ButtonComponent } from "../CustomizeComponent";

interface SelectUserProps {
  open: boolean;
  handleCloseDialog: (e: SyntheticEvent) => void;
}

const SelectRoleModal = ({ open, handleCloseDialog }: SelectUserProps) => {
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
              Select User from WSO2
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Filter />

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
                  border: "1.5px solid",
                  borderColor: lineGray,
                  width: "135px",
                }}
              >
                Cancel
              </ButtonComponent>
              <ButtonComponent
                sx={{
                  backgroundColor: orangeMain,
                  color: primaryDark,
                  width: "135px",
                }}
                href={"/user/users/create"}
              >
                Continue
              </ButtonComponent>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};
export default SelectRoleModal;
