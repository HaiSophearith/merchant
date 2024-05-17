import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import {} from "../../store/constant";
import { ButtonCustom, GridFooter } from "../CustomizeComponent";

interface DeleteProps {
  open: boolean;
  handleOnCancel?: () => void;
  handleOnConfirm: (note: string) => void;
}

const ReviewStatusModal = ({
  open,
  handleOnCancel,
  handleOnConfirm,
}: DeleteProps) => {
  const [remark, setRemark] = useState<string>("");

  const handleChangeRemark = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRemark(value);
  };

  const doneHandle = () => {
    handleOnConfirm(remark);
  };

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
              Reveiw Note
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              onChange={handleChangeRemark}
              value={remark}
              fullWidth
              label="Remark"
            />
            <GridFooter gridSize="modalBtns">
              <ButtonCustom
                onClick={handleOnCancel}
                variant="cancelBtn"
                buttonLabel="Cancel"
              />
              <ButtonCustom
                onClick={doneHandle}
                variant="orangeBtn"
                buttonLabel="Done"
              />
            </GridFooter>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};
export default ReviewStatusModal;
