import {
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { CustomerFeedback, TableHeaderProps } from "../../../types/types";
import { gray14, orange14, orangeMain } from "../../../store/constant";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../../ui-component/EditIcon";
import EyeIcon from "../../../ui-component/EyeIcon";
import capitalizeFirstCharacter from "../../../utils/convertStringToCapitalize";
import { ReactComponent as SortIcon } from "../../../assets/icons/sort.svg";
import { FEEDBACK_DETAiL_URL } from "../../../routes/Routes";

const customerHeader: TableHeaderProps[] = [
  {
    id: "id",
    label: "ID",
    icon: SortIcon,
  },
  {
    id: "submitter name",
    label: "Submitter Name",
    icon: SortIcon,
  },
  {
    id: "phone number",
    label: "Phone Number",
  },
  {
    id: "request type",
    label: "Request Type",
  },
  {
    id: "submit date",
    label: "Submit Date",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "Action",
    label: "Action",
  },
];

const CustomerList = ({
  feedbackList,
}: {
  feedbackList: CustomerFeedback[];
}) => {
  const navigate = useNavigate();

  return (
    <TableContainer>
      <Table>
        <TableHead sx={{ backgroundColor: gray14 }}>
          <TableRow>
            {customerHeader?.map(({ id, label, icon: Icon }) => (
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
          {feedbackList.length > 0 &&
            feedbackList.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.customer.fullName}</TableCell>
                  <TableCell>{item.customer.phoneNumber}</TableCell>
                  <TableCell>{capitalizeFirstCharacter(item.type)}</TableCell>
                  <TableCell>
                    {format(new Date(item.submitDate), "dd MMM, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        color:
                          item.status === "PENDING" ? orangeMain : undefined,
                        bgcolor:
                          item.status === "PENDING" ? orange14 : undefined,
                        minWidth: "100px",
                      }}
                      label={
                        item.status === "PENDING"
                          ? "New"
                          : capitalizeFirstCharacter(item.status)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      size="large"
                      aria-label="View"
                      onClick={() =>
                        navigate(
                          FEEDBACK_DETAiL_URL.replace(":id", item.id as string)
                        )
                      }
                    >
                      <EyeIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      size="large"
                      aria-label="Edit"
                      onClick={() =>
                        navigate(
                          FEEDBACK_DETAiL_URL.replace(":id", item.id as string)
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerList;
