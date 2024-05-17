import React, { ChangeEvent, useCallback, useState, MouseEvent } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Modal,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import MainCard from "../../../ui-component/cards/MainCard";
import useQueryCustomerFeedbacks from "../../../hooks/useQueryCustomerFeedbacks";
import useReactSearchParams from "../../../hooks/useReactSearchParams";
import {
  BreadCrumbIncludeBtn,
  style,
} from "../../../ui-component/CustomizeComponent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Breadcrumbs from "../../../ui-component/extended/Breadcrumbs";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import navigation from "../../../menu-items/index";
import CustomerList from "./CustomerList";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import useMutationCustomerFeedbackCSVFile from "../../../hooks/useMutationCustomerFeedbackCSVFile";
import { backBtnBackground, orangeMain } from "../../../store/constant";

const RequestTypes = {
  ALL: "",
  INQUIRY: "INQUIRY",
  COMPLAINT: "COMPLAINT",
  FEEDBACK: "FEEDBACK",
  SUGGESTION: "SUGGESTION",
};

const RequestTypeOptions = [
  { value: "", label: "All" },
  { value: "INQUIRY", label: "Inquiry" },
  { value: "COMPLAINT", label: "Complaint" },
  { value: "FEEDBACK", label: "Feedback" },
  { value: "SUGGESTION", label: "Suggestion" },
];

const CustomerPage = () => {
  const [searchParams] = useReactSearchParams();
  const pageNumber = Number(searchParams.get("pageSize") || 0);
  const limit = Number(searchParams.get("limit") || 10);
  const [page, setPage] = useState(pageNumber);
  const [rowsPerPage, setRowsPerPage] = useState(limit);
  const [requestType, setRequestType] = useState(RequestTypes.ALL);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [CSVModalOpen, setCSVModalOpen] = useState(false);

  const { feedbackList, total } = useQueryCustomerFeedbacks({
    pageNumber: page,
    limit: rowsPerPage,
    type: requestType,
  });
  const { mutateAsync: download } = useMutationCustomerFeedbackCSVFile({
    type: requestType,
    fromDate: startDate,
    toDate: endDate,
  });

  const handleChangeRequestType = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRequestType(e.target.value);
    },
    []
  );

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCSVModalClose = () => {
    setCSVModalOpen(false);
    setStartDate(null);
    setEndDate(null);
  };

  const onChangeStartDate = (startDate: any) => {
    setStartDate(new Date(startDate).toISOString());
  };

  const onChangeEndDate = (endDate: any) => {
    setEndDate(new Date(endDate).toISOString());
  };

  const handleExportCSV = async () => {
    try {
      await download();
      setCSVModalOpen(false);
    } catch (e) {}
  };

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
        <Button
          sx={{
            padding: "14px",
            bgcolor: "#333",
            borderRadius: "12px",
            color: "#fff",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#333",
            },
          }}
          onClick={() => {
            setCSVModalOpen(true);
          }}
        >
          Export as CSV
        </Button>
      </BreadCrumbIncludeBtn>
      <Box sx={{ padding: "24px", paddingTop: "0" }}>
        <MainCard>
          <Grid container md={3} xs={12} pb={2}>
            <TextField
              sx={{ mt: 0 }}
              id="module"
              select
              label={requestType === "" && "All"}
              value={requestType}
              onChange={handleChangeRequestType}
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
              {RequestTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <CustomerList feedbackList={feedbackList} />
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Modal open={CSVModalOpen} onClose={handleCSVModalClose}>
            <Box sx={style}>
              <Typography variant="h3">Export as CSV file</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box py={3}>
                  <DatePicker
                    renderInput={(props) => <TextField fullWidth {...props} />}
                    value={startDate}
                    onChange={onChangeStartDate}
                    label="Start Date"
                    inputFormat="dd MMM, yyyy"
                  />
                </Box>
                <Box pb={3}>
                  <DatePicker
                    renderInput={(props) => <TextField fullWidth {...props} />}
                    value={endDate}
                    onChange={onChangeEndDate}
                    label="End Date"
                    inputFormat="dd MMM, yyyy"
                  />
                </Box>
              </LocalizationProvider>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  columnGap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: backBtnBackground,
                    color: "#000",
                    padding: "8px 30px",
                    borderRadius: "10px",
                    "&:hover": {
                      borderColor: backBtnBackground,
                    },
                  }}
                  onClick={handleCSVModalClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: orangeMain,
                    color: "#000",
                    padding: "8px 30px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "none",
                    },
                  }}
                  onClick={handleExportCSV}
                >
                  Export
                </Button>
              </Box>
            </Box>
          </Modal>
        </MainCard>
      </Box>
    </>
  );
};
export default CustomerPage;
