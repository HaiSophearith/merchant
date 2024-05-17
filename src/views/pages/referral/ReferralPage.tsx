import React, { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import {
  BreadCrumbIncludeBtn,
  ButtonCustom,
  GridListContainer,
  style,
} from "../../../ui-component/CustomizeComponent";
import Breadcrumbs from "../../../ui-component/extended/Breadcrumbs";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import navigation from "../../../menu-items/index";
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Modal,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { frontDate, gridSpacing } from "../../../store/constant";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ReferralList } from "../../../ui-component/listCollection/ReferralList";
import useQueryReferrals from "../../../hooks/useQueryReferrals";
import { ReferralQuery } from "../../../types/types";
import useReactSearchParams from "../../../hooks/useReactSearchParams";
import useQueryBranches from "../../../hooks/useQueryBranches";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";
import useMutationReferralCSVFile from "../../../hooks/useMutationReferralCSVFile";

const REFERRAL_QUERY: { [key in ReferralQuery]: string } = {
  PAGE_NUMBER: "pageNumber",
  LIMIT: "limit",
  BRANCH_ID: "branchId",
  QUERY: "staffId",
  START_DATE: "startDate",
  END_DATE: "endDate",
};

const ReferralPage = () => {
  const [searchParams, setSearchParams] = useReactSearchParams();
  const pageNumber = Number(searchParams.get(REFERRAL_QUERY.PAGE_NUMBER) || 0);
  const limit = Number(searchParams.get(REFERRAL_QUERY.LIMIT) || 10);
  const branchId = searchParams.get(REFERRAL_QUERY.BRANCH_ID) || "";
  const query = searchParams.get(REFERRAL_QUERY.QUERY) || "";
  const [page, setPage] = useState<number>(pageNumber);
  const [rowsPerPage, setRowsPerPage] = useState<number>(limit);
  const [startDateValue, setStartDateValue] = useState<string | null>(null);
  const [endDateValue, setEndDateValue] = useState<string | null>(null);
  const [branchIdValue, setBranchIdValue] = useState(branchId);
  const [staffId, setStaffId] = useState<string>(query);
  const [openCSVReferral, setOpenCSVReferral] = useState<boolean>(false);
  const [startDateExport, setStartDateExport] = useState<string | null>(null);
  const [endDateExport, setEndDateExport] = useState<string | null>(null);

  const { mutateAsync: downloadCSVReferral } = useMutationReferralCSVFile({
    pageNumber: 0,
    limit: 10,
    branchId,
    query: query,
    startDate: startDateExport,
    endDate: endDateExport,
  });

  const handleExportCSVReferral = async () => {
    try {
      await downloadCSVReferral();
      setOpenCSVReferral(false);
    } catch (e) {}
  };

  const handleCSVModalClose = () => {
    setOpenCSVReferral(!openCSVReferral);
  };

  const onChangeStartDate = (startDate: any) => {
    setStartDateValue(new Date(startDate).toISOString());
  };

  const onChangeEndDate = (endDate: any) => {
    setEndDateValue(new Date(endDate).toISOString());
  };

  const onChangeStartDateExport = (startDateExport: any) => {
    setStartDateExport(new Date(startDateExport).toISOString());
  };

  const onChangeEndDateExport = (endDateExport: any) => {
    setEndDateExport(new Date(endDateExport).toISOString());
  };

  const onChangeBranchId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBranchIdValue(e.target.value);
  }, []);

  const { referrals, total } = useQueryReferrals({
    limit: rowsPerPage,
    pageNumber: page,
    branchId: branchIdValue,
    query: query,
    startDate: startDateValue,
    endDate: endDateValue,
  });

  const { branches } = useQueryBranches();

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

  const onChangeSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setStaffId(value || "");
      if (value === "") {
        setSearchParams({
          [REFERRAL_QUERY.QUERY]: "",
          [REFERRAL_QUERY.PAGE_NUMBER]: "0",
        });
      }
    },
    [setSearchParams]
  );

  const onSearchKeyDown = useCallback(
    (e: { code: string }) => {
      if (e.code === "Enter") {
        setSearchParams({
          [REFERRAL_QUERY.QUERY]: staffId,
          [REFERRAL_QUERY.PAGE_NUMBER]: "0",
        });
      }
    },
    [staffId, setSearchParams]
  );

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
        <ButtonCustom
          onClick={() => {
            setOpenCSVReferral(true);
          }}
          variant="blackBtn"
          buttonLabel="Export as CSV"
        />
      </BreadCrumbIncludeBtn>
      <Container maxWidth={false}>
        <GridListContainer>
          <Grid
            item
            xs={10}
            container
            sx={{ padding: "24px" }}
            spacing={gridSpacing}
          >
            <Grid item md={3} xs={12}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                placeholder="Staff Id"
                onChange={onChangeSearch}
                onKeyDown={onSearchKeyDown}
                name="searchQuery"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                sx={{ mt: 0 }}
                id="outlined-select-gender"
                select
                label={branchIdValue === null ? "Branch Id" : ""}
                value={branchIdValue}
                onChange={onChangeBranchId}
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
                {branches.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item md={3} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField fullWidth {...props} />}
                  value={startDateValue}
                  onChange={onChangeStartDate}
                  label="Start Date"
                  inputFormat={frontDate}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item md={3} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField fullWidth {...props} />}
                  value={endDateValue}
                  onChange={onChangeEndDate}
                  label="End Date"
                  inputFormat={frontDate}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <ReferralList referrals={referrals} />
          <TablePagination
            sx={{ padding: "24px" }}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Modal open={openCSVReferral} onClose={handleCSVModalClose}>
            <Box sx={style}>
              <Typography variant="h3">Export as CSV file</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box py={3}>
                  <DatePicker
                    renderInput={(props) => <TextField fullWidth {...props} />}
                    value={startDateExport}
                    onChange={onChangeStartDateExport}
                    label="Start Date"
                    inputFormat={frontDate}
                  />
                </Box>
                <Box pb={3}>
                  <DatePicker
                    renderInput={(props) => <TextField fullWidth {...props} />}
                    value={endDateExport}
                    onChange={onChangeEndDateExport}
                    label="End Date"
                    inputFormat={frontDate}
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
                <ButtonCustom onClick={handleCSVModalClose} variant="cancelBtn">
                  Cancel
                </ButtonCustom>
                <ButtonCustom
                  onClick={handleExportCSVReferral}
                  variant="orangeBtn"
                >
                  Export
                </ButtonCustom>
              </Box>
            </Box>
          </Modal>
        </GridListContainer>
      </Container>
    </>
  );
};
export default ReferralPage;
