import {
  Box,
  Chip,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import MainCard from "../../../ui-component/cards/MainCard";
import useQueryCustomerFeedbackDetail from "../../../hooks/useQueryCustomerFeedbackDetail";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import {
  BreadCrumbIncludeBtn,
  ButtonCustom,
  GridFooter,
} from "../../../ui-component/CustomizeComponent";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import Breadcrumbs from "../../../ui-component/extended/Breadcrumbs";
import navigation from "../../../menu-items/index";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import { ConfirmationDialog } from "../merchantApplication/businessManagement/businessUpdatePage/BusinessUpdatePage";
import useMutationUpdateCustomerFeedback from "../../../hooks/useMutationUpdateCustomerFeedback";
import { orange14, orangeMain } from "../../../store/constant";
import capitalizeFirstCharacter from "../../../utils/convertStringToCapitalize";
import { FEEDBACK_URL } from "../../../routes/Routes";

const CustomerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [status, setStatus] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  const { feedbackDetail } = useQueryCustomerFeedbackDetail(id!);
  const { mutateAsync: updateStatus } = useMutationUpdateCustomerFeedback();

  useEffect(() => {
    if (!feedbackDetail) return;
    setStatus(feedbackDetail.status);
  }, [feedbackDetail]);

  const handleChangeStatus = async () => {
    setIsOpen(true);
  };

  const handleConfirmation = async () => {
    if (!id) return;
    await updateStatus({ id });
  };

  if (!feedbackDetail) return <></>;
  return (
    <>
      <BreadCrumbIncludeBtn>
        <Breadcrumbs
          separator={FiberManualRecord}
          navigation={navigation}
          icon
          title
          rightAlign
        />
        {status === "NEW" && (
          <TextField
            sx={{ mt: 0, maxWidth: "200px" }}
            id="standard-basic"
            select
            label={status}
            value={status}
            onChange={handleChangeStatus}
            InputLabelProps={{ shrink: false }}
            margin="normal"
            variant="outlined"
            fullWidth
            SelectProps={{ IconComponent: () => null }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <KeyboardArrowDownIcon />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value={"CLOSED"}>Closed</MenuItem>
          </TextField>
        )}
      </BreadCrumbIncludeBtn>
      <Box sx={{ padding: "20px", paddingTop: "0" }}>
        <MainCard title={"Customer Feedback Information"}>
          <Grid container pb={2}>
            <Grid xs={4}>Submit Date</Grid>
            <Grid xs={8}>
              {format(new Date(feedbackDetail.submitDate), "dd MMM, yyyy")}
            </Grid>
          </Grid>
          <Grid container pb={2}>
            <Grid xs={4}>Status</Grid>
            <Grid xs={8}>
              <Chip
                size="small"
                sx={{
                  color:
                    feedbackDetail.status === "NEW" ? orangeMain : undefined,
                  bgcolor:
                    feedbackDetail.status === "NEW" ? orange14 : undefined,
                  minWidth: "100px",
                }}
                label={capitalizeFirstCharacter(feedbackDetail.status)}
              />
            </Grid>
          </Grid>
          <Grid container pb={2}>
            <Grid xs={4}>Submitter Name</Grid>
            <Grid xs={8}>{feedbackDetail.customer.fullName}</Grid>
          </Grid>
          <Grid container pb={2}>
            <Grid xs={4}>Phone Number</Grid>
            <Grid xs={8}>{feedbackDetail.customer.phoneNumber}</Grid>
          </Grid>
          <Grid container pb={2}>
            <Grid xs={4}>Request Type</Grid>
            <Grid xs={8}>{capitalizeFirstCharacter(feedbackDetail.type)}</Grid>
          </Grid>
          <Grid container pb={2}>
            <Grid xs={4}>Description</Grid>
            <Grid xs={8}>{feedbackDetail.description}</Grid>
          </Grid>
        </MainCard>
      </Box>
      <GridFooter gridSize="formFooter">
        <ButtonCustom
          variant="cancelBtn"
          buttonLabel="Close"
          onClick={() => navigate(FEEDBACK_URL)}
        />
      </GridFooter>
      <ConfirmationDialog
        open={isOpen}
        content="Are you sure you want to update the request status New to Closed?"
        setOpen={setIsOpen}
        handleConfirmation={handleConfirmation}
      />
    </>
  );
};

export default CustomerDetail;
