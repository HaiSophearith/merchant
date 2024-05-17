import React from "react";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import {} from "../../store/constant";
import { ButtonCustom, GridFooter } from "../CustomizeComponent";

interface ConfirmProps {
  open: boolean;
  handleOnCancel?: () => void;
  handleOnConfirm?: () => void;
  description?: string;
}

const ConfirmModal = ({
  open,
  description,
  handleOnCancel,
  handleOnConfirm,
}: ConfirmProps) => {
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
      onClose={handleOnCancel}
    >
      {open && (
        <>
          <DialogTitle>
            <Typography
              sx={{ fontWeight: "600", fontSize: "20px" }}
              variant="h5"
            >
              Confirmation
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6">{description}</Typography>
            <GridFooter gridSize="modalBtns">
              <ButtonCustom
                onClick={handleOnCancel}
                variant="cancelBtn"
                buttonLabel="No"
              />
              <ButtonCustom
                onClick={handleOnConfirm}
                variant="orangeBtn"
                buttonLabel="Yes"
              />
            </GridFooter>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};
export default ConfirmModal;
