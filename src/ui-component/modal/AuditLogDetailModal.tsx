import React, { SyntheticEvent } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { gray14 } from "../../store/constant";
import { ButtonCustom } from "../CustomizeComponent";
import { format } from "date-fns";
import { AuditView, TableHeaderProps } from "../../types/types";

interface AuditLogDetailProps {
  open: boolean;
  handleCloseDialog: (e: SyntheticEvent) => void;
  auditView: AuditView | null;
}

const AuditLongDetailModal = ({
  open,
  handleCloseDialog,
  auditView,
}: AuditLogDetailProps) => {
  const auditLogDetailHeaders: TableHeaderProps[] = [
    {
      id: "Occurred",
      label: "Occurred",
      align: "left",
    },
    {
      id: "ID",
      label: "ID",
      align: "left",
    },
    {
      id: "FieldName",
      label: "Field Name",
      align: "left",
    },
    {
      id: "Activity",
      label: "Activity",
      align: "left",
    },
    {
      id: "Old Data",
      label: "old Data",
      align: "left",
    },
    {
      id: "New Data",
      label: "New Data",
      align: "left",
    },
  ];
  return (
    <Dialog
      sx={{
        "&>div:nth-of-type(3)": {
          justifyContent: "center",
          "&>div": {
            m: 0,
            borderRadius: "12px",
            padding: "10px",
            maxWidth: 800,
            maxHeight: "100%",
          },
        },
      }}
      open={open}
      onClose={handleCloseDialog}
    >
      {open && (
        <>
          <DialogTitle>
            <Typography sx={{ fontWeight: "14px" }} variant="h5">
              History Details
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography>
              User Name{" "}
              <span style={{ paddingLeft: "10px" }}>
                {auditView?.modifiedBy}
              </span>
            </Typography>
            <Typography>
              Module{" "}
              <span style={{ paddingLeft: "10px" }}>
                {auditView?.entityType}
              </span>
            </Typography>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: gray14, width: "100%" }}>
                  <TableRow>
                    {auditLogDetailHeaders?.map((tableHeader) => (
                      <TableCell key={tableHeader.id}>
                        <TableSortLabel>{tableHeader.label}</TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {format(
                        auditView ? new Date(auditView.modifiedOn) : new Date(),
                        "dd MMM, yyyy hh:mm a"
                      )}
                    </TableCell>
                    <TableCell>{auditView?.id}</TableCell>
                    <TableCell>{auditView?.field}</TableCell>
                    <TableCell>{auditView?.action}</TableCell>
                    <TableCell>{auditView?.oldValue}</TableCell>
                    <TableCell>{auditView?.newValue}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <ButtonCustom
                onClick={handleCloseDialog}
                variant="orangeBtn"
                buttonLabel="Close"
              />
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};
export default AuditLongDetailModal;
