import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from "react";
import {
  Grid,
  InputAdornment,
  MenuItem,
  TablePagination,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { BusinessList } from "../../../../../ui-component/listCollection/BusinessList";
import {
  gridSpacing,
  lineGray,
  primaryLight,
} from "../../../../../store/constant";
import useQueryBusinessList from "../../../../../hooks/useQueryBusinessList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useReactSearchParams from "../../../../../hooks/useReactSearchParams";
import { SearchQuery } from "../../../../../types/types";
import useQueryBusinessCategories from "../../../../../hooks/useQueryBusinessCategories";

const SEARCH_QUERY: { [key in SearchQuery]: string } = {
  PAGE_NUMBER: "pageNumber",
  LIMIT: "limit",
  QUERY: "query",
  MERCHANT_TYPE: "merchantType",
  CATEGORY_ID: "categoryId",
  STATUS: "status",
};

const AllBusinessTab = () => {
  const [searchParams, setSearchParams] = useReactSearchParams();
  const query = searchParams.get(SEARCH_QUERY.QUERY) || "";
  const pageNumber = Number(searchParams.get(SEARCH_QUERY.PAGE_NUMBER) || 0);
  const limit = Number(searchParams.get(SEARCH_QUERY.LIMIT) || 10);
  const merchantType = searchParams.get(SEARCH_QUERY.MERCHANT_TYPE) || "";
  const categoryId = searchParams.get(SEARCH_QUERY.CATEGORY_ID || "");
  const status = searchParams.get(SEARCH_QUERY.STATUS) || "";
  const [searchInputValue, setSearchInputValue] = useState(query);
  const [merchantTypeValue, setMerchantTypeValue] = useState(merchantType);
  const [categoryIdValue, setCategoryIdValue] = useState(categoryId);
  const [statusValue, setStatusValue] = useState(status);
  const [page, setPage] = useState(pageNumber);
  const [rowsPerPage, setRowsPerPage] = useState(limit);

  const { businessCategoies } = useQueryBusinessCategories();

  const categories = useMemo(() => {
    if (!businessCategoies) return [];
    const result = Object.values(businessCategoies).map((item) => {
      return { value: item.id, label: item.name };
    });
    return result || [];
  }, [businessCategoies]);

  const merchantTypeOptions = [
    { id: 1, value: "", label: "All" },
    { id: 2, value: "CORPORATE", label: "Corporate" },
    { id: 3, value: "RETAILER", label: "Retailer" },
  ];

  const businessStatuses = [
    { id: 1, value: "", label: "All" },
    { id: 2, value: "VERIFIED", label: "Verified" },
    { id: 3, value: "UNVERIFIED", label: "Unverified" },
    { id: 4, value: "ESCALATED", label: "Escalated" },
  ];

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

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchInputValue(value);
      if (value === "") {
        setSearchParams({
          [SEARCH_QUERY.QUERY]: "",
          [SEARCH_QUERY.PAGE_NUMBER]: "0",
        });
      }
    },
    [setSearchParams]
  );
  const onSearchKeyDown = useCallback(
    (e: { code: string }) => {
      if (e.code === "Enter") {
        setSearchParams({
          [SEARCH_QUERY.QUERY]: searchInputValue,
          [SEARCH_QUERY.PAGE_NUMBER]: "0",
        });
      }
    },
    [searchInputValue, setSearchParams]
  );

  const handleChangeMerchantType = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setMerchantTypeValue(value);
    },
    []
  );

  const handleChangeCategoryId = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setCategoryIdValue(value);
    },
    []
  );

  const handleChangeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStatusValue(value);
  }, []);

  const { businessList, total } = useQueryBusinessList({
    pageNumber: page,
    limit: rowsPerPage,
    query: query,
    merchantType: merchantTypeValue,
    categoryId: categoryIdValue!,
    status: statusValue,
  });

  return (
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
            placeholder="Search Name"
            name="searchQuery"
            onChange={handleInputChange}
            onKeyDown={onSearchKeyDown}
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <TextField
            sx={{ mt: 0 }}
            id="standard-basic"
            select
            label={merchantTypeValue === "" ? "Merchant Type" : ""}
            value={merchantTypeValue}
            onChange={handleChangeMerchantType}
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
            {merchantTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            sx={{ mt: 0 }}
            id="outlined-select-gender"
            select
            label={categoryIdValue === null && "Business Category"}
            value={categoryIdValue}
            onChange={handleChangeCategoryId}
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
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            sx={{ mt: 0 }}
            id="outlined-select-gender"
            select
            label={statusValue === "" ? "Business Status" : ""}
            value={statusValue}
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
            {businessStatuses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <BusinessList businesses={businessList} />
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Grid>
  );
};

export default AllBusinessTab;
