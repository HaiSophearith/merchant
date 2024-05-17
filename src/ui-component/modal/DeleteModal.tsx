import React from "react";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import {} from "../../store/constant";
import { ButtonCustom, GridFooter } from "../CustomizeComponent";

interface DeleteProps {
  open: boolean;
  handleOnCancel?: () => void;
  handleOnConfirm?: () => void;
  description?: string;
}

const DeleteModal = ({
  open,
  description,
  handleOnCancel,
  handleOnConfirm,
}: DeleteProps) => {
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
              Delete
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6">{description}</Typography>
            <GridFooter gridSize="modalBtns">
              <ButtonCustom
                onClick={handleOnCancel}
                variant="cancelBtn"
                buttonLabel="Cancel"
              />
              <ButtonCustom
                onClick={handleOnConfirm}
                variant="errorBtn"
                buttonLabel="Delete"
              />
            </GridFooter>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};
export default DeleteModal;
