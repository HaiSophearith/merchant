import { useMemo, useState } from "react";
import { Box, Grid, Step, StepLabel, Stepper } from "@mui/material";

import Breadcrumbs from "../../../../../ui-component/extended/Breadcrumbs";
import navigation from "../../../../../menu-items/index";
import {
  alertDuration,
  backBtnBackground,
  orangeMain,
  primaryDark,
  primaryLight,
} from "../../../../../store/constant";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import {
  BreadCrumbContainer,
  ButtonComponent,
} from "../../../../../ui-component/CustomizeComponent";
import {
  businessSchema,
  counterSchema,
  shopSchema,
} from "../../../../../schemas/business";
import { Form, Formik } from "formik";
import useMutationCreateBusiness, {
  CreateBusinessVariables,
} from "../../../../../hooks/useMutationCreateBusiness";
import { useNavigate } from "react-router";
import { ConfirmationDialog } from "../businessUpdatePage/BusinessUpdatePage";
import ShopCreateForm from "../../shopManagement/shopCreatePage/ShopCreateForm";
import CounterCreatePage from "../../counterManagement/CounterCreatePage/CounterCreatePage";
import SuccessDialog from "../../../../../ui-component/modal/SuccessDialog";
import BusinessForm from "./BusinessForm";
import { AxiosError } from "axios";
import { ErrorInfo } from "../../../../../types/types";
import ErrorDialog from "../../../../../ui-component/modal/ErrorDialog";
import { BUSINESS_URL } from "../../../../../routes/Routes";

const stepsLabel = ["Create Business", "Create Shop", "Create Counter"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <BusinessForm />;
    case 1:
      return <ShopCreateForm />;
    case 2:
      return <CounterCreatePage />;
    default:
      return <></>;
  }
}

const breadcrumbSteps = [
  { id: 1, label: "Create Business" },
  { id: 2, label: "Create Shop" },
  { id: 3, label: "Create Counter" },
];

const initialState = {
  businessName: null,
  businessType: null,
  merchantType: null,
  businessCategory: null,
  businessPhoneNumber: null,
  cif: null,
  supportedDocuments: null,
  creationDocuments: null,
  shopName: null,
  shopType: null,
  phoneNumber: undefined,
  telegramBot: undefined,
  bankAccountUSD: undefined,
  bankAccountKHR: undefined,
  addressLine1: null,
  latitude: null,
  longitude: null,
  address: {
    province: null,
    district: null,
    communue: null,
    village: null,
  },
  enabledTip: false,
  counterName: null,
  enabled: true,
};

const BusinessCreatePage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const isLastStep = activeStep === stepsLabel.length - 1;
  const validationSchema = [businessSchema, shopSchema, counterSchema];
  const currentValidationSchema = validationSchema[activeStep];
  const { mutateAsync: createBusiness } = useMutationCreateBusiness();
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  const handleOnSubmit = async (values: any, actions: any) => {
    try {
      if (isLastStep) {
        const input: CreateBusinessVariables = {
          name: values.businessName,
          nameType: values.businessType,
          merchantType: values.merchantType,
          categoryId: values.businessCategory,
          referralCode: values.referralCode,
          logoUrl: values.logoUrl,
          businessOwnerPhoneNumber: `+855${values.businessPhoneNumber}`,
          supportedDocuments: values.supportedDocuments,
          creationDocuments: values.creationDocuments,
          shops: [
            {
              name: values.shopName,
              shopTypeId: values.shopType,
              latitude: values.latitude,
              longitude: values.longitude,
              addressLine1: values.addressLine1,
              villageId: values.address.village,
              bankAccountNumbers: [
                values.bankAccountUSD,
                values.bankAccountKHR,
              ],
              profileImageUrl: values.profileImageUrl,
              enabledTip: values.enabledTip,
              counters: [
                {
                  name: values.counterName,
                },
              ],
            },
          ],
        };
        await createBusiness(input);
        handleSuccessDialog();
      } else {
        setActiveStep(activeStep + 1);
        actions.setTouched({});
        actions.setSubmitting(false);
      }
    } catch (e) {
      const error = e as AxiosError<ErrorInfo>;
      setErrorMessage(error.response?.data.reason as string);
      handleErrorDialog();
    }
  };

  const customActions = useMemo(() => {
    switch (activeStep) {
      case 1:
        return ["Create Shop"];
      case 2:
        return ["Create Shop", "Create Counter"];
      default:
        return [];
    }
  }, [activeStep]);

  return (
    <Box>
      <BreadCrumbContainer>
        <Breadcrumbs
          separator={FiberManualRecord}
          customActions={customActions}
          actionStep={activeStep}
          navigation={navigation}
          icon
          title
          rightAlign
        />
      </BreadCrumbContainer>

      <Box sx={{ width: "100%" }}>
        <Stepper
          sx={{
            "& .MuiStepIcon-root": {
              fontSize: "2rem",
            },
            "& .Mui-active": {
              "&.MuiStepIcon-root": {
                color: orangeMain,
              },
            },
            "& .Mui-completed": {
              "&.MuiStepIcon-root": {
                fontSize: "2rem",
                color: orangeMain,
              },
              "& .MuiStepConnector-line": {
                borderColor: "secondary.main",
              },
            },
          }}
          activeStep={activeStep}
          alternativeLabel
        >
          {breadcrumbSteps.map((breadcrumbStep) => (
            <Step key={breadcrumbStep.id}>
              <StepLabel>{breadcrumbStep.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Formik
        initialValues={initialState}
        validationSchema={currentValidationSchema}
        onSubmit={handleOnSubmit}
      >
        {() => (
          <Form>
            <Box sx={{ marginBottom: "80px" }}>
              {getStepContent(activeStep)}
            </Box>
            <Grid
              sx={{
                width: "100%",
                backgroundColor: primaryLight,
                boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
                bottom: 0,
                padding: "20px 24px",
                position: "absolute",
              }}
              xs={12}
              container
            >
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {activeStep !== 0 && (
                  <Box>
                    <ButtonComponent
                      sx={{
                        backgroundColor: backBtnBackground,
                        color: primaryLight,
                        width: "135px",
                      }}
                      onClick={() => setActiveStep(activeStep - 1)}
                    >
                      Back
                    </ButtonComponent>
                  </Box>
                )}
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <ButtonComponent
                    sx={{
                      color: primaryDark,
                      width: "135px",
                      border: "1px solid #E3E3E3",
                      marginRight: "10px",
                    }}
                    onClick={() => setIsOpen(true)}
                  >
                    Cancel
                  </ButtonComponent>
                  <ButtonComponent
                    type="submit"
                    sx={{
                      width: "135px",
                      backgroundColor: orangeMain,
                      color: primaryDark,
                    }}
                  >
                    {isLastStep ? "Create" : "Next"}
                  </ButtonComponent>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <ConfirmationDialog
        open={isOpen}
        content="Are you sure you want to cancel create business? If you cancel your data you filled will erased."
        setOpen={setIsOpen}
        handleConfirmation={() => navigate(BUSINESS_URL)}
      />
      <SuccessDialog open={openSuccessDialog} message="Create Successfully!" />
      <ErrorDialog open={openErrorDialog} message={errorMessage} />
    </Box>
  );
};
export default BusinessCreatePage;
