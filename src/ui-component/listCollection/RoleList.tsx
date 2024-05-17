import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { HeadCell, RoleProps } from "../../types/types";
import {
  TableContainer,
  Table,
  TableCell,
  TableSortLabel,
  TableBody,
  IconButton,
  TablePagination,
  Paper,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";
import { orangeMain, tableHeaderBackground } from "../../store/constant";
import DeleteModal from "../modal/DeleteModal";

const headCells: HeadCell[] = [
  {
    id: "Users",
    label: "Users",
    align: "right",
  },
  {
    id: "Permission",
    label: "Permission",
    align: "center",
  },
  {
    id: "Actions",
    label: "Actions",
    align: "center",
  },
];

const roles: RoleProps[] = [
  {
    no: 1,
    roleName: "Super Administrator",
    users: 12,
    permission: "View Permission",
  },
  {
    no: 2,
    roleName: "Administrator",
    users: 0,
    permission: "View Permission",
  },
  {
    no: 3,
    roleName: "Administrator 1",
    users: 2,
    permission: "View Permission",
  },
  {
    no: 4,
    roleName: "Administrator 2",
    users: 54,
    permission: "View Permission",
  },
];
export const RoleList = () => {
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
  ) => {
    event?.target.value && setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{ backgroundColor: tableHeaderBackground, width: "100%" }}
          >
            <TableRow sx={{ width: "100%" }}>
              <TableCell>
                <TableSortLabel active IconComponent={SortIcon}>
                  No
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active IconComponent={SortIcon}>
                  Roles Name
                </TableSortLabel>
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  padding={headCell.disablePadding ? "none" : "normal"}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {roles.map((role) => {
              return (
                <TableRow sx={{ width: "100%" }}>
                  <TableCell>{role.no}</TableCell>
                  <TableCell>{role.roleName}</TableCell>
                  <TableCell>{role.users}</TableCell>
                  <TableCell
                    sx={{
                      color: orangeMain,
                      textDecorationLine: "underline",
                    }}
                  >
                    {role.permission}
                  </TableCell>

                  <TableCell align="left">
                    <IconButton color="primary" size="large" aria-label="View">
                      <RemoveRedEyeIcon sx={{ color: "black" }} />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      size="large"
                      aria-label="View"
                      component={Link}
                      to={"/user/roles/create"}
                    >
                      <EditCalendarIcon sx={{ color: "orange" }} />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      size="large"
                      aria-label="View"
                      onClick={handleDelete}
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={5}
          rowsPerPage={rowsPerPage}
          page={page}
          style={{
            padding: "24px 40px 24px 40px",
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <DeleteModal
        description="Are you sure you want to delete this Role?"
        open={open}
        handleOnCancel={handleCloseDialog}
      />
    </>
  );
};
export default RoleList;
