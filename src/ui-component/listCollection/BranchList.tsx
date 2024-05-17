import React from "react";
import DeleteIcon from "../DeleteIcon";
import EyeIcon from "../EyeIcon";
import EditIcon from "../EditIcon";
import { BranchProps, TableHeaderProps } from "../../types/types";
import {
  TableContainer,
  Table,
  TableCell,
  TableSortLabel,
  TableBody,
  IconButton,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableHeaderBackground } from "../../store/constant";
import { EnabledLabel } from "../CustomizeComponent";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";
import { BRANCH_DETAIL_URL, BRANCH_UPDATE_URL } from "../../routes/Routes";
import { useNavigate } from "react-router";

const branchHeader: TableHeaderProps[] = [
  {
    id: "No",
    label: "No",
    icon: SortIcon,
  },
  {
    id: "Branch Code",
    label: "Branch Code",
    icon: SortIcon,
  },
  {
    id: "Branch Name",
    label: "Branch Name",
    icon: SortIcon,
  },
  {
    id: "City/Province",
    label: "City/Province",
  },
  {
    id: "Status",
    label: "Status",
  },
  {
    id: "Action",
    label: "Action",
  },
];

export const BranchList = ({
  branches,
  onDelete,
}: {
  branches: BranchProps[];
  onDelete?: (id: string) => void;
}) => {
  const navigate = useNavigate();
  return (
    <TableContainer>
      <Table>
        <TableHead
          sx={{ backgroundColor: tableHeaderBackground, width: "100%" }}
        >
          <TableRow>
            {branchHeader?.map(({ id, label, icon: Icon }) => (
              <TableCell key={id}>
                <TableSortLabel
                  active={!!Icon}
                  hideSortIcon={!Icon}
                  IconComponent={Icon}
                >
                  {label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {branches.map((branch, index) => {
            return (
              <TableRow key={index} sx={{ width: "100%" }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{branch.branchCode}</TableCell>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.province.name}</TableCell>
                <TableCell>
                  <EnabledLabel enabledLabel={branch.enabled} />
                </TableCell>
                <TableCell align="left">
                  <IconButton
                    onClick={() =>
                      navigate(
                        BRANCH_DETAIL_URL.replace(
                          ":branchId",
                          branch.id as string
                        )
                      )
                    }
                  >
                    <EyeIcon />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      navigate(
                        BRANCH_UPDATE_URL.replace(
                          ":branchId",
                          branch.id as string
                        )
                      )
                    }
                  >
                    <EditIcon />
                  </IconButton>

                  {onDelete && (
                    <IconButton onClick={() => onDelete(branch.id!)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
