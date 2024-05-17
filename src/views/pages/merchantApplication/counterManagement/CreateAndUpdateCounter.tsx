import { Box, Modal, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import CounterCreateForm from "./CounterCreatePage/CounterCreateForm";
import useMutationCreateCounter from "../../../../hooks/useMutationCreateCounter";
import useMutationUpdateCounter from "../../../../hooks/useMutationUpdateCounter";
import { CounterProps } from "../../../../types/types";
import useQueryCounter from "../../../../hooks/useQueryCounter";
import SuccessDialog from "../../../../ui-component/modal/SuccessDialog";
import { useNavigate, useParams } from "react-router-dom";
import { alertDuration } from "../../../../store/constant";
import {
  ButtonCustom,
  style,
} from "../../../../ui-component/CustomizeComponent";
import { Formik } from "formik";
import * as yup from "yup";
import { VIEW_SHOP } from "../../../../routes/Routes";

const DUPLICATED_NAME_CODE = 30013;

const counterSchema = yup.object().shape({
  name: yup.string().min(5).max(25).required("required"),
});

const CreateAndUpdateCounter = ({
  shopId,
  counterId,
}: {
  shopId: string;
  counterId?: string;
}) => {
  const { mutateAsync: createCounter } = useMutationCreateCounter();
  const { mutateAsync: updateCounter } = useMutationUpdateCounter();
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const navigate = useNavigate();
  const { businessId } = useParams();

  const { counter } = useQueryCounter({
    shopId,
    counterId: counterId!,
  });

  const initialValues = useMemo(() => {
    if (!!counterId) {
      return counter;
    } else {
      return {
        name: null,
      };
    }
  }, [counter, counterId]);

  const handleSuccessDialog = () => {
    setOpenSuccessDialog(!openSuccessDialog);
    setTimeout(() => {
      setOpenSuccessDialog(false);
      navigate(VIEW_SHOP.replace(":businessId", businessId as string));
    }, alertDuration);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOnSubmit = async (values: CounterProps) => {
    try {
      if (!!counterId) {
        await updateCounter({
          shopId,
          counterId,
          counterVariables: {
            id: counterId,
            name: values.name,
            enabled: values.enabled,
          },
        });
        handleSuccessDialog();
      } else
        await createCounter({
          shopId,
          counterVariables: {
            name: values.name,
            enabled: values.enabled,
          },
        });
      handleSuccessDialog();
    } catch (err: any) {
      console.log(err);
      const errorCode = err.response?.data?.code;
      if (errorCode === DUPLICATED_NAME_CODE) setOpenConfirm(!openConfirm);
    }
  };
  return (
    <Box>
      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={counterSchema}
          onSubmit={handleOnSubmit}
        >
          {() => <CounterCreateForm />}
        </Formik>
      )}

      <SuccessDialog
        open={openSuccessDialog}
        message={counterId ? "Edit Successfully!" : "Create Successfully!"}
      />

      <Modal open={openConfirm} onClose={handleCloseConfirm}>
        <Box sx={style}>
          <Typography variant="h3">Duplicate Name</Typography>

          <Box pt="24px" pb="24px">
            <Typography>
              This Counter name already exists. Try to create new Counter Name.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              columnGap: 2,
            }}
          >
            <ButtonCustom onClick={handleCloseConfirm} variant="orangeBtn">
              Okay
            </ButtonCustom>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
export default CreateAndUpdateCounter;
