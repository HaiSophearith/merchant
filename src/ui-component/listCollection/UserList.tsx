import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { HeadCell, UserProps } from "../../types/types";
import {
  TableContainer,
  Table,
  TableCell,
  TableSortLabel,
  TableBody,
  IconButton,
  TablePagination,
  Typography,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteModal from "../modal/DeleteModal";
import { Link } from "react-router-dom";
import {
  gray14,
  green15,
  primaryGray,
  primaryGreen,
  tableHeaderBackground,
} from "../../store/constant";

const headCells: HeadCell[] = [
  {
    id: "No",
    label: "No",
    align: "left",
  },
  {
    id: "Staff ID",
    label: "Staff ID",
    align: "left",
  },
  {
    id: "Full Name",
    label: "Full Name",
    align: "right",
  },
  {
    id: "Role",
    label: "Role",
    align: "center",
  },
  {
    id: "Branch",
    label: "Branch",
    align: "center",
  },
  {
    id: "Status",
    label: "Status",
    align: "center",
  },
  {
    id: "Actions",
    label: "Actions",
    align: "center",
  },
];

const users: UserProps[] = [
  {
    no: 1,
    staffId: 11111,
    fullName: "Jacob Jones",
    role: "Admin 1",
    branch: "Branch1",
    status: "Active",
  },
  {
    no: 2,
    staffId: 22222,
    fullName: "Marvin Mickinney",
    role: "Admin2",
    branch: "Branch2",
    status: "Inactive",
  },
  {
    no: 3,
    staffId: 33333,
    fullName: "Darrell Steward",
    role: "Admin3",
    branch: "Branch3",
    status: "Active",
  },
  {
    no: 4,
    staffId: 44444,
    fullName: "Ariene McCoy",
    role: "Admin4",
    branch: "Branc4",
    status: "Active",
  },
];
export const UserList = () => {
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
      <TableContainer>
        <Table>
          <TableHead
            sx={{ backgroundColor: tableHeaderBackground, width: "100%" }}
          >
            <TableRow sx={{ width: "100%" }}>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  padding={headCell.disablePadding ? "none" : "normal"}
                >
                  <TableSortLabel>{headCell.label}</TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => {
              return (
                <TableRow sx={{ width: "100%" }}>
                  <TableCell>{user.no}</TableCell>
                  <TableCell>{user.staffId}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.branch}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        borderRadius: "25px",

                        backgroundColor:
                          user.status === "Active" ? green15 : gray14,
                        color:
                          user.status === "Active" ? primaryGreen : primaryGray,
                        padding: "6px 8px",
                        width: "78px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {user.status}
                    </Typography>
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
                      to={"/user/usersManagement/userCreate"}
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
      </TableContainer>
      <TablePagination
        sx={{ padding: "24px" }}
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={5}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <DeleteModal
        description="Are you sure you want to delete this User?"
        open={open}
        handleOnCancel={handleCloseDialog}
      />
    </>
  );
};
export default UserList;
