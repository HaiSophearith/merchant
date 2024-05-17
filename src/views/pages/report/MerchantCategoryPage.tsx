import React, {ChangeEvent, MouseEvent, useCallback, useState,} from "react";
import useReactSearchParams from "../../../hooks/useReactSearchParams";
import {frontDate, gridSpacing, lineGray, primaryLight} from "../../../store/constant";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import navigation from "../../../menu-items";
import Breadcrumbs from "../../../ui-component/extended/Breadcrumbs";
import {BreadCrumbContainer} from "../../../ui-component/CustomizeComponent";
import {Box, Grid, InputAdornment, MenuItem, TablePagination, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useQueryBranches from "../../../hooks/useQueryBranches";
import useQueryRegionals from "../../../hooks/useQueryRegionals";
import MerchantCategoryList from "../../../ui-component/listCollection/MerchantCategoryList";
import useQueryMerchantByCategory from "../../../hooks/useQueryMerchantByCategory";

const MerchantCategoryPage = () => {
    const [searchParams] = useReactSearchParams();
    const pageNumber = Number(searchParams.get("pageSize") || 0);
    const limit = Number(searchParams.get("limit") || 10);
    const [page, setPage] = useState(pageNumber);
    const [rowsPerPage, setRowsPerPage] = useState(limit);
    const [regionalId, setRegionalId] = useState<string | null>(null);
    const [branchId, setBranchId] = useState<string | null>(null);
    const [startDateValue, setStartDateValue] = useState<string | null>(null);
    const [endDateValue, setEndDateValue] = useState<string | null>(null);

    const {merchantCategoryItems, total} = useQueryMerchantByCategory({
        pageNumber: page,
        limit: rowsPerPage,
        regionalId: regionalId,
        branchId: branchId,
        fromDate: startDateValue,
        toDate: endDateValue,
    });

    const regionalsResp = useQueryRegionals()
    const branchesResp = useQueryBranches();

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

    const onChangeRegional = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setRegionalId(e.target.value);
    }, []);

    const onChangeBranch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setBranchId(e.target.value);
    }, []);

    const onChangeStartDate = (startDate: any) => {
        setStartDateValue(new Date(startDate).toISOString());
    };

    const onChangeEndDate = (endDate: any) => {
        setEndDateValue(new Date(endDate).toISOString());
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
            <Box sx={{padding: "24px", paddingTop: "0"}}>
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
                        sx={{padding: "24px"}}
                        spacing={gridSpacing}
                    >
                        <Grid item md={2} xs={12}>
                            <TextField
                                sx={{mt: 0}}
                                id="regionalId"
                                select
                                value={regionalId}
                                onChange={onChangeRegional}
                                InputLabelProps={{shrink: false}}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                SelectProps={{IconComponent: () => null}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <KeyboardArrowDownIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                            >
                                {regionalsResp.regionals.map((regional) => (
                                    <MenuItem key={regional.name} value={regional.id}>
                                        {regional.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <TextField
                                sx={{mt: 0}}
                                id="module"
                                select
                                value={branchId}
                                onChange={onChangeBranch}
                                InputLabelProps={{shrink: false}}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                SelectProps={{IconComponent: () => null}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <KeyboardArrowDownIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                            >
                                {branchesResp.branches.map((branch) => (
                                    <MenuItem key={branch.id} value={branch.id}>
                                        {branch.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item md={2} xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    renderInput={(props) => (
                                        <TextField
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon/>
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
                    </Grid>

                    <MerchantCategoryList merchantCategoryItems={merchantCategoryItems}/>
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
        </>
    );
};
export default MerchantCategoryPage;