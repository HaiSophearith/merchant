import {
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import {
  primaryLight,
  orangeMain,
  primaryDark,
  alertDuration,
} from "../../../../../store/constant";
import { useNavigate, useParams } from "react-router";
import { Form, Formik } from "formik";
import BusinessCreateForms from "../businessCreatePage/BusinessForm";
import { FC, useMemo, useState } from "react";
import useMutationUpdateBusiness from "../../../../../hooks/useMutationUpdateBusiness";
import useQueryBusinessDetail from "../../../../../hooks/useQueryBusinessDetail";
import {
  BreadCrumbContainer,
  ButtonComponent,
} from "../../../../../ui-component/CustomizeComponent";
import Breadcrumbs from "../../../../../ui-component/extended/Breadcrumbs";
import navigation from "../../../../../menu-items/index";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import { AxiosError } from "axios";
import { ErrorInfo } from "../../../../../types/types";
import ErrorDialog from "../../../../../ui-component/modal/ErrorDialog";
import SuccessDialog from "../../../../../ui-component/modal/SuccessDialog";
import { BUSINESS_URL } from "../../../../../routes/Routes";

export interface BusinessFormProps {
  businessName: string;
  businessType: string;
  merchantType: string;
  businessCategory: string;
  enabled: boolean;
}

interface ConfirmationDialogProps {
  open: boolean;
  content: string;
  setOpen: (open: boolean) => void;
  handleConfirmation: () => void;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  open,
  content,
  setOpen,
  handleConfirmation,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    handleConfirmation();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <ButtonComponent
          sx={{
            color: primaryDark,
            backgroundColor: primaryLight,
            width: "135px",
            border: "1px solid #E3E3E3",
          }}
          onClick={handleClose}
        >
          No
        </ButtonComponent>
        <ButtonComponent
          onClick={handleYes}
          sx={{
            width: "135px",
            backgroundColor: orangeMain,
            color: primaryDark,
          }}
        >
          Yes
        </ButtonComponent>
      </DialogActions>
    </Dialog>
  );
};

const BusinessUpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const _id = id as string;
  const { eachBusiness, status } = useQueryBusinessDetail({
    businessId: _id,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

  const handleSuccessDialog = () => {
    setOpenSuccessDialog(!openSuccessDialog);
    setTimeout(() => {
      setOpenSuccessDialog(false);
      navigate(BUSINESS_URL);
    }, alertDuration);
  };

  const handleErrorDialog = () => {
    setOpenErrorDialog(!openErrorDialog);
    setTimeout(() => {
      setOpenErrorDialog(false);
    }, alertDuration);
  };

  const { mutate: updateBusiness } = useMutationUpdateBusiness(_id);

  const handleOnSubmit = async (values: any) => {
    try {
      const input = {
        name: values.businessName,
        merchantType: values.merchantType,
        nameType: values.businessType,
        enabled: values.enabled,
        logoUrl: values.logoUrl,
        supportedDocuments: values.supportedDocuments,
        creationDocuments: values.creationDocuments,
      };
      await updateBusiness(input);
      handleSuccessDialog();
    } catch (e) {
      const error = e as AxiosError<ErrorInfo>;
      setErrorMessage(error.response?.data.reason as string);
      handleErrorDialog();
    }
  };

  const initialValues = useMemo(() => {
    if (!eachBusiness) return null;
    const values = {
      businessType: eachBusiness?.nameType,
      businessName: eachBusiness?.name,
      merchantType: eachBusiness?.merchantType,
      businessCategory: eachBusiness?.category.id,
      enabled: eachBusiness?.enabled,
      logoUrl: eachBusiness?.logoUrl,
      supportedDocuments: eachBusiness.supportedDocuments,
      creationDocuments: eachBusiness.creationDocuments,
      referralCode: eachBusiness.referralCode,
      businessPhoneNumber: eachBusiness.owner.phoneNumber,
      cif: eachBusiness.owner.cbsCustId,
    };
    return values;
  }, [eachBusiness]);

  return (
    <Box>
      <BreadCrumbContainer>
        <Breadcrumbs
          separator={FiberManualRecord}
          navigation={navigation}
          icon
          title
          rightAlign
        />
      </BreadCrumbContainer>
      {status === "success" && initialValues && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleOnSubmit}
          enableReinitialize={true}
        >
          {() => (
            <Form>
              <BusinessCreateForms id={_id} />
            </Form>
          )}
        </Formik>
      )}
      <ErrorDialog open={openErrorDialog} message={errorMessage} />
      <SuccessDialog open={openSuccessDialog} message="Edit Successfully!" />
    </Box>
  );
};
export default BusinessUpdatePage;
