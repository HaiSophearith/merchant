import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import React, { ReactNode } from "react";
import { Employee, HeadCell } from "../../types/types";
import { orangeMain, primaryLight, gray14 } from "../../store/constant";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const headCells: HeadCell[] = [
  {
    id: "Name",
    label: "Name",
    align: "left",
  },
  {
    id: "Phone Number",
    label: "Phone Number",
    align: "left",
  },
  {
    id: "Shop",
    label: "Shop",
    align: "left",
  },
  {
    id: "Counter",
    label: "Counter",
    align: "left",
  },
  {
    id: "Action",
    label: "Action",
    align: "left",
  },
];

const ExpandableTableRow = ({
  children,
  expandComponent,
  ...otherProps
}: {
  children: ReactNode;
  expandComponent: ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <>
      <TableRow {...otherProps}>
        {children}
        <TableCell
          sx={{ display: "flex", justifyContent: "space-between" }}
          align="left"
        >
          <IconButton color="secondary" size="large" aria-label="View">
            <RemoveRedEyeIcon sx={{ color: "black" }} />
          </IconButton>
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <KeyboardArrowDownIcon
                sx={{
                  backgroundColor: gray14,
                  borderRadius: "100%",
                  width: "24px",
                  height: "24px",
                }}
              />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
      </TableRow>
      {isExpanded && <TableRow>{expandComponent}</TableRow>}
    </>
  );
};

interface StaffProps {
  staffList: Employee[];
}

export default function StaffListInViewBusiness({ staffList }: StaffProps) {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: gray14, width: "100%" }}>
            <TableRow>
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
            {staffList.map((staff, index) => (
              <ExpandableTableRow
                key={index}
                expandComponent={
                  <TableCell
                    colSpan={6}
                    sx={{
                      backgroundColor: gray14,
                      paddingTop: "0",
                      paddingBottom: "12px",
                    }}
                  >
                    <Grid
                      sx={{
                        marginTop: "12px",
                        background: primaryLight,
                        border: "none",
                        borderRadius: "12px",
                        padding: "14px 22px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{ width: "30px", height: "30px" }}
                            variant="rounded"
                          >
                            <UploadFileIcon />
                          </Avatar>
                          <Box
                            sx={{
                              marginLeft: "15px",
                              display: "flex",
                              alightItem: "center",
                            }}
                          >
                            <Typography variant="h6">Shop</Typography>

                            <FiberManualRecord
                              sx={{
                                width: "10px",
                                m: "0 10px",
                                color: gray14,
                              }}
                            />
                            <Typography variant="h6">Counter</Typography>
                          </Box>
                        </Box>
                        <Typography color={orangeMain}>{staff.role}</Typography>
                      </Box>
                    </Grid>
                  </TableCell>
                }
              >
                <TableCell>{staff.fullName}</TableCell>
                <TableCell>{staff.phoneNumber}</TableCell>
                <TableCell>No Shop</TableCell>
                <TableCell>No Counter</TableCell>
              </ExpandableTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
