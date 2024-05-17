import React, {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useState,
} from "react";
import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  TablePagination,
  TextField,
} from "@mui/material";
import AuditList from "../../../ui-component/listCollection/AuditList";
import useReactSearchParams from "../../../hooks/useReactSearchParams";
import useQueryAuditView from "../../../hooks/useQueryAuditView";
import {
  frontDate,
  gridSpacing,
  lineGray,
  primaryLight,
} from "../../../store/constant";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { BreadCrumbContainer } from "../../../ui-component/CustomizeComponent";
import Breadcrumbs from "../../../ui-component/extended/Breadcrumbs";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import navigation from "../../../menu-items/index";
import AuditLongDetailModal from "../../../ui-component/modal/AuditLogDetailModal";
import { AuditView } from "../../../types/types";

const AuditLogPage = () => {
  const [searchParams, setSearchParams] = useReactSearchParams();
  const queryParam = searchParams.get("query") || null;
  const pageNumber = Number(searchParams.get("pageSize") || 0);
  const limit = Number(searchParams.get("limit") || 10);
  const [page, setPage] = useState(pageNumber);
  const [rowsPerPage, setRowsPerPage] = useState(limit);
  const [activityValue, setActivityValue] = useState("");
  const [moduleValue, setModuleValue] = useState("");
  const [startDateValue, setStartDateValue] = useState<string | null>(null);
  const [endDateValue, setEndDateValue] = useState<string | null>(null);
  const [query, setQuery] = useState<string | null>(queryParam);
  const [auditViewObj, setAuditViewObj] = useState<AuditView | null>(null);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { auditViews, total } = useQueryAuditView({
    pageNumber: page,
    limit: rowsPerPage,
    entityType: moduleValue,
    action: activityValue,
    field: query,
    fromDate: startDateValue,
    toDate: endDateValue,
  });

  const actionOptions = [
    { value: "", label: "All" },
    { value: "CREATE", label: "Create" },
    { value: "UPDATE", label: "Update" },
    { value: "DELETE", label: "Delete" },
  ];

  const moduleOptions = [
    { value: "", label: "All" },
    { value: "COUNTER", label: "Counters" },
    { value: "BUSINESS", label: "Business" },
    { value: "SHOP", label: "Shop" },
    { value: "QRCODE", label: "Qr Code" },
    { value: "MATERIAL", label: "Material" },
  ];

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const onChangeActivity = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setActivityValue(e.target.value);
  }, []);

  const onChangeModule = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setModuleValue(e.target.value);
  }, []);

  const onChangeStartDate = (startDate: any) => {
    setStartDateValue(new Date(startDate).toISOString());
  };

  const onChangeEndDate = (endDate: any) => {
    setEndDateValue(new Date(endDate).toISOString());
  };

  const onChangeSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchParams({ query: e.target.value, pageSize: "0" });
    },
    [setSearchParams]
  );

  const onKeydownSearch = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter") {
        setQuery(searchParams.get("query"));
      }
    },
    [searchParams]
  );

  const onOpenAuditDetailDialog = (auditView: AuditView) => {
    setAuditViewObj(auditView);
    setIsOpenDialog(true);
  };

  const onCloseDialog = () => {
    setIsOpenDialog(false);
  };

  return (
    <>
      <BreadCrumbContainer>
        <Breadcrumbs
          separator={FiberManualRecord}
          navigation={navigation}
          icon
          title
          rightAlign
        />
      </BreadCrumbContainer>
      <Box sx={{ padding: "24px", paddingTop: "0" }}>
        <Grid
          sx={{
            borderRadius: "12px",
            border: "0.5px solid",
            borderColor: lineGray,
            background: primaryLight,
          }}
        >
          <Grid
            item
            md={12}
            xs={12}
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
                placeholder="Search Field Name"
                name="searchByFieldName"
                onChange={onChangeSearch}
                onKeyDown={onKeydownSearch}
              />
            </Grid>
            <Grid item md={2} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => (
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      {...props}
                    />
                  )}
                  value={startDateValue}
                  onChange={onChangeStartDate}
                  label="Start Date"
                  inputFormat={frontDate}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={2} xs={12}>
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
            <Grid item md={2} xs={12}>
              <TextField
                sx={{ mt: 0 }}
                id="activity"
                select
                label={activityValue === "" ? "Activity" : ""}
                value={activityValue}
                onChange={onChangeActivity}
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
                {actionOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                sx={{ mt: 0 }}
                id="module"
                select
                label={moduleValue === "" ? "Module" : ""}
                value={moduleValue}
                onChange={onChangeModule}
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
                {moduleOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <AuditList
            auditViews={auditViews}
            onOpenDetail={onOpenAuditDetailDialog}
          />
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Box>
      <AuditLongDetailModal
        open={isOpenDialog}
        handleCloseDialog={onCloseDialog}
        auditView={auditViewObj}
      />
    </>
  );
};

export default AuditLogPage;
