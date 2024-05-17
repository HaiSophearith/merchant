import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TablePagination,
  TextField,
} from "@mui/material";
import {
  BreadCrumbIncludeBtn,
  ButtonCustom,
  GridListContainer,
} from "../../../ui-component/CustomizeComponent";
import Breadcrumbs from "../../../ui-component/extended/Breadcrumbs";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import navigation from "../../../menu-items/index";
import AddIcon from "../../../ui-component/AddIcon";
import { gridSpacing, padding24 } from "../../../store/constant";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { BranchList } from "../../../ui-component/listCollection/BranchList";
import useQueryBranches from "../../../hooks/useQueryBranches";
import useQueryProvinces from "../../../hooks/useQueryProvinces";
import { ChangeEvent, useState, MouseEvent, useMemo, useCallback } from "react";
import DeleteModal from "../../../ui-component/modal/DeleteModal";
import useMutationDeleteBranch from "../../../hooks/useMutationDeleteBranch";
import { BRANCH_CREATE_URL } from "../../../routes/Routes";
import { useNavigate } from "react-router";

const BranchPage = () => {
  const [provinceId, setProvinceId] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [branchId, setBranchId] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const { mutate: deleteBranch } = useMutationDeleteBranch();
  const { provinces } = useQueryProvinces();
  const { branches } = useQueryBranches();
  const [search, setSearch] = useState<string>("");

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

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value || "");
  };

  const filterBranches = useMemo(() => {
    return branches
      .filter((branch) => {
        if (!!provinceId) {
          return branch.province.id === provinceId;
        }
        return true;
      })
      .filter((branch) => {
        if (!!search) {
          return branch.branchCode === search || branch.name === search;
        }
        return true;
      });
  }, [branches, provinceId, search]);

  const branchPaginate = useMemo(() => {
    return filterBranches.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filterBranches, page, rowsPerPage]);

  const handleChangeProvinceId = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setProvinceId(value);
    },
    []
  );
  const handleOpenDeleteModal = (branchId: string) => {
    setOpen(!open);
    setBranchId(branchId);
  };

  const handleCancelModal = () => {
    setOpen(false);
    setBranchId(undefined);
  };

  const handleConfirmDelete = useCallback(() => {
    if (branchId) {
      deleteBranch(branchId);
      handleCancelModal();
    }
  }, [deleteBranch, branchId]);

  const navigate = useNavigate();

  return (
    <Box>
      <BreadCrumbIncludeBtn>
        <Breadcrumbs
          separator={FiberManualRecord}
          navigation={navigation}
          icon
          title
          rightAlign
        />

        <ButtonCustom
          onClick={() => navigate(BRANCH_CREATE_URL)}
          buttonLabel="Create Branch"
          variant="orangeBtn"
        >
          <IconButton size="small">
            <AddIcon />
          </IconButton>
        </ButtonCustom>
      </BreadCrumbIncludeBtn>
      <Box sx={{ padding: padding24, paddingTop: "0" }}>
        <GridListContainer>
          <>
            <Grid
              item
              xs={10}
              container
              sx={{ padding: padding24 }}
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
                  placeholder="Search Branch code, name"
                  onChange={handleSearchInput}
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <TextField
                  sx={{ mt: 0 }}
                  id="outlined-select-gender"
                  select
                  label={provinceId === "" ? "Province" : ""}
                  value={provinceId}
                  onChange={handleChangeProvinceId}
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
                  {provinces.map((province) => (
                    <MenuItem key={province.name} value={province.id}>
                      {province.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            {branchPaginate.length > 0 && (
              <BranchList
                onDelete={handleOpenDeleteModal}
                branches={branchPaginate}
              />
            )}

            <TablePagination
              sx={{ padding: "24px" }}
              component="div"
              count={filterBranches.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        </GridListContainer>
      </Box>
      <DeleteModal
        handleOnConfirm={handleConfirmDelete}
        handleOnCancel={handleCancelModal}
        open={open}
        description="Are you sure you want to delete this Branch?"
      />
    </Box>
  );
};
export default BranchPage;
