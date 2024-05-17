import {
  Chip,
  Container,
  Grid,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";

import {
  blue14,
  blueMain,
  gray14,
  orange14,
  orangeMain,
  pink14,
  pinkMain,
} from "../../store/constant";

import { MATERIAL_REQUEST_STATUS, TableHeaderProps } from "../../types/types";
import { useState } from "react";
import useReactSearchParams from "../../hooks/useReactSearchParams";
import { GridListContainer } from "../CustomizeComponent";
import SearchIcon from "@mui/icons-material/Search";
import TableActionButtons from "../TableActionButtons/TableActionButtons";
import { format } from "date-fns";
import { MATERIAL_REQUEST_DETAIL_URL } from "../../routes/Routes";
import { useNavigate } from "react-router";

import TabsCustom from "../Tabs/TabsCustom";
import { computeTabCount } from "../Tabs/TabPanel";
import useQueryMaterialRequests from "../../hooks/useQueryMaterialRequest";

const PAGE = {
  pageNumber: 0,
  limit: 1,
};

const headers: TableHeaderProps[] = [
  {
    id: "no",
    label: "No.",
    icon: SortIcon,
  },
  {
    id: "requester-name",
    label: "Requester Name",
  },
  {
    id: "phone-number",
    label: "Phone Number",
    icon: SortIcon,
  },
  {
    id: "request-date",
    label: "Request Date",
  },
  {
    id: "platform",
    label: "Platform",
  },
  {
    id: "request-status",
    label: "Request Status",
  },
  {
    id: "actions",
    label: "Actions",
  },
];

export const convertStringToDate = (date: string, pattern?: string) => {
  return format(new Date(date), pattern || "dd MMM, yyyy h:mm aa");
};

export function computeMaterialRequestStatus(status: string) {
  switch (status) {
    case MATERIAL_REQUEST_STATUS.PENDING:
      return (
        <Chip
          sx={{ backgroundColor: orange14, color: orangeMain }}
          label="New"
        />
      );
    case MATERIAL_REQUEST_STATUS.PROCESSING:
      return (
        <Chip
          sx={{ backgroundColor: pink14, color: pinkMain }}
          label="Processing"
        />
      );
    case MATERIAL_REQUEST_STATUS.PICK_UP:
      return (
        <Chip
          sx={{ backgroundColor: blue14, color: blueMain }}
          label="Ready to Pick up"
        />
      );
    case MATERIAL_REQUEST_STATUS.COMPLETED:
      return <Chip label="Completed" />;
    case MATERIAL_REQUEST_STATUS.CANCELLED:
      return <Chip label="Cancelled" />;
    case MATERIAL_REQUEST_STATUS.DELIVERING:
      return <Chip label="Delivering" />;
    case MATERIAL_REQUEST_STATUS.DELIVERED:
      return <Chip label="Delivered" />;
    default:
      return null;
  }
}

export function computeMaterialRequestPlatform(platform: string) {
  switch (platform) {
    case "MOBILE":
      return <Typography>Mobile</Typography>;
    case MATERIAL_REQUEST_STATUS.PROCESSING:
      return <Typography></Typography>;

    default:
      return null;
  }
}

function List({ status }: { status?: string }) {
  const navigate = useNavigate();

  const [searchParams] = useReactSearchParams();
  const pageNumber = Number(searchParams.get("pageNumber") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const [page, setPage] = useState<number>(pageNumber);
  const [rowsPerPage, setRowsPerPage] = useState<number>(limit);

  const { materialRequests } = useQueryMaterialRequests({
    pageNumber: page,
    limit: 2,
    status,
  });

  if (!materialRequests) return null;

  const { items, total } = materialRequests || {};

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
  ) => {
    event?.target.value && setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  const handleOnView = (id: string) => {
    navigate(MATERIAL_REQUEST_DETAIL_URL.replace(":materialRequestId", id));
  };

  return (
    <>
      <Grid
        sx={{ padding: "0 16px 16px" }}
        container
        lg={3}
        md={4}
        sm={8}
        xs={12}
      >
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
          name="search"
        />
      </Grid>

      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: gray14, width: "100%" }}>
            <TableRow>
              {headers?.map(({ id, label, icon: Icon }) => (
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
            {items.map((item, index) => {
              return (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.customer.fullName}</TableCell>
                  <TableCell>{item.customer.phoneNumber}</TableCell>
                  <TableCell>
                    {item.createdDate
                      ? convertStringToDate(item.createdDate)
                      : ""}
                  </TableCell>
                  <TableCell>{computeMaterialRequestPlatform(item.platform)}</TableCell>
                  <TableCell>
                    {computeMaterialRequestStatus(item.status)}
                  </TableCell>

                  <TableCell>
                    <TableActionButtons
                      itemId={item.id}
                      onView={handleOnView}
                    />
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
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default function MaterialRequestList() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const { materialRequests: newMaterialRequests } = useQueryMaterialRequests({
    ...PAGE,
    status: MATERIAL_REQUEST_STATUS.PENDING,
  });

  const { materialRequests: processingMaterialRequests } =
    useQueryMaterialRequests({
      ...PAGE,
      status: MATERIAL_REQUEST_STATUS.PROCESSING,
    });
  const { materialRequests: pickUpMaterialRequests } = useQueryMaterialRequests(
    {
      ...PAGE,
      status: MATERIAL_REQUEST_STATUS.PICK_UP,
    }
  );
  const { materialRequests: deliveringMaterialRequests } =
    useQueryMaterialRequests({
      ...PAGE,
      status: MATERIAL_REQUEST_STATUS.DELIVERING,
    });
  const { materialRequests: deliveredMaterialRequests } =
    useQueryMaterialRequests({
      ...PAGE,
      status: MATERIAL_REQUEST_STATUS.DELIVERED,
    });
  const { materialRequests: completedMaterialRequests } =
    useQueryMaterialRequests({
      ...PAGE,
      status: MATERIAL_REQUEST_STATUS.COMPLETED,
    });
  const { materialRequests: cancelledMaterialRequests } =
    useQueryMaterialRequests({
      ...PAGE,
      status: MATERIAL_REQUEST_STATUS.CANCELLED,
    });

  const tabs = [
    {
      key: "all",
      label: "All",
      component: <List />,
    },
    {
      key: "new",
      label: "New",
      count: computeTabCount(newMaterialRequests?.total),
      component: <List status={MATERIAL_REQUEST_STATUS.PENDING} />,
    },
    {
      key: "processing",
      label: "Processing",
      count: computeTabCount(processingMaterialRequests?.total),
      component: <List status={MATERIAL_REQUEST_STATUS.PROCESSING} />,
    },
    {
      key: "pick-up",
      label: "Pick up",
      count: computeTabCount(pickUpMaterialRequests?.total),
      component: <List status={MATERIAL_REQUEST_STATUS.PICK_UP} />,
    },
    {
      key: "delivering",
      label: "Delivering",
      count: computeTabCount(deliveringMaterialRequests?.total),
      component: <List status={MATERIAL_REQUEST_STATUS.DELIVERING} />,
    },
    {
      key: "completed",
      label: "Picked up",
      count: computeTabCount(completedMaterialRequests?.total),
      component: <List status={MATERIAL_REQUEST_STATUS.COMPLETED} />,
    },
    {
      key: "delivered",
      label: "Delivered",
      count: computeTabCount(deliveredMaterialRequests?.total),
      component: <List status={MATERIAL_REQUEST_STATUS.DELIVERED} />,
    },
    {
      key: "cancelled",
      label: "Cancelled",
      count: computeTabCount(cancelledMaterialRequests?.total),
      component: <List status={MATERIAL_REQUEST_STATUS.CANCELLED} />,
    },
  ];

  if (!processingMaterialRequests) return null;

  const handleOnTabChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth={false}>
      <GridListContainer>
        <TabsCustom
          value={activeTab}
          items={tabs}
          onChange={handleOnTabChange}
        />
      </GridListContainer>
    </Container>
  );
}
