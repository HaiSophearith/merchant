import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { AuditView, TableHeaderProps } from "../../types/types";
import { gray14 } from "../../store/constant";
import EyeIcon from "../EyeIcon";
import { format } from "date-fns";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";

const auditHeaders: TableHeaderProps[] = [
  {
    id: "No",
    label: "No",
    icon: SortIcon,
  },
  {
    id: "Occurred",
    label: "Occurred",
  },
  {
    id: "Occurred",
    label: "Occurred",
  },
  {
    id: "ID",
    label: "ID",
  },
  {
    id: "FieldName",
    label: "Field Name",
  },
  {
    id: "Module",
    label: "Module",
  },
  {
    id: "Activity",
    label: "Activity",
  },
  {
    id: "Actions",
    label: "Actions",
  },
];

const AuditList = ({
  auditViews,
  onOpenDetail,
}: {
  auditViews: AuditView[];
  onOpenDetail: (auditView: AuditView) => void;
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead sx={{ backgroundColor: gray14, width: "100%" }}>
          <TableRow>
            {auditHeaders?.map(({ id, label, icon: Icon }) => (
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
        {auditViews && (
          <TableBody>
            {auditViews.map((auditView, index) => {
              return (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {format(
                      new Date(auditView.modifiedOn),
                      "dd MMM, yyyy hh:mm a"
                    )}
                  </TableCell>
                  <TableCell>{auditView.id}</TableCell>
                  <TableCell>{auditView.field}</TableCell>
                  <TableCell>{auditView.entityType}</TableCell>
                  <TableCell>{auditView.action}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onOpenDetail(auditView!)}>
                      <EyeIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};
export default AuditList;
