import {
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
} from "@mui/material";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";

import { gray14 } from "../../store/constant";

import { STATUS_LABEL, TableHeaderProps } from "../../types/types";
import useQueryAnnouncements from "../../hooks/useQueryAnnouncements";
import { useMemo, useState } from "react";
import useReactSearchParams from "../../hooks/useReactSearchParams";
import { GridListContainer, Status } from "../CustomizeComponent";
import SearchIcon from "@mui/icons-material/Search";
import TableActionButtons from "../TableActionButtons/TableActionButtons";
import { format } from "date-fns";
import { ANNOUNCEMENT_UPDATE_URL } from "../../routes/Routes";
import { useNavigate } from "react-router";
import useMutationDeleteAnnouncement from "../../hooks/useMutationDeleteAnnouncement";
import DeleteModal from "../modal/DeleteModal";
import AnnouncementDetailModal from "./AnnouncementDetailModal";

import TabsCustom from "../Tabs/TabsCustom";
import { computeTabCount } from "../Tabs/TabPanel";

const headers: TableHeaderProps[] = [
  {
    id: "no",
    label: "No.",
    icon: SortIcon,
  },
  {
    id: "title",
    label: "Title",
  },
  {
    id: "created_date",
    label: "Created Date",
    icon: SortIcon,
  },

  {
    id: "status",
    label: "Status",
  },
  {
    id: "actions",
    label: "Actions",
  },
];

export const convertStringToDate = (date: string, pattern?: string) => {
  return format(new Date(date), pattern || "dd MMM, yyyy h:mm aa");
};

function List({ status }: { status: string }) {
  const navigate = useNavigate();

  const [searchParams] = useReactSearchParams();
  const pageNumber = Number(searchParams.get("pageNumber") || 0);
  const limit = Number(searchParams.get("limit") || 10);
  const [page, setPage] = useState<number>(pageNumber);
  const [rowsPerPage, setRowsPerPage] = useState<number>(limit);

  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [announcementId, setAnnouncementId] = useState<string | undefined>();

  const { announcements, refetch } = useQueryAnnouncements({
    pageNumber: page,
    limit: limit,
    status,
  });

  const announcement = useMemo(() => {
    return (
      announcements?.items.find((item) => item.id === announcementId) || null
    );
  }, [announcements, announcementId]);

  const { mutateAsync: deleteAnnouncement } = useMutationDeleteAnnouncement();

  if (!announcements) return null;
  const { items, total } = announcements;

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
    setViewModal(true);
    setAnnouncementId(id);
  };

  const handleOnEdit = (id: string) => {
    navigate(ANNOUNCEMENT_UPDATE_URL.replace(":announcementId", id));
  };

  const handleOnDelete = (id: string) => {
    setDeleteModal(true);
    setAnnouncementId(id);
  };

  const handleDelete = async () => {
    setDeleteModal(false);
    if (!announcementId) return;
    try {
      await deleteAnnouncement(announcementId);
      refetch?.();
    } catch (e) {
      // op
    }
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
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{convertStringToDate(item.createdDate)}</TableCell>
                  <TableCell>
                    <Status status={item.status} isChip />
                  </TableCell>
                  <TableCell>
                    <TableActionButtons
                      itemId={item.id}
                      onView={handleOnView}
                      onEdit={handleOnEdit}
                      onDelete={handleOnDelete}
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

      <AnnouncementDetailModal
        open={viewModal}
        onClose={() => setViewModal(false)}
        announcement={announcement}
      />

      <DeleteModal
        handleOnCancel={() => setDeleteModal(false)}
        handleOnConfirm={handleDelete}
        open={deleteModal}
        description="Are you sure you want to delete this announcement?"
      />
    </>
  );
}

export default function AnnouncementList() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const { announcements: draftAnnouncements } = useQueryAnnouncements({
    pageNumber: 0,
    limit: 1,
    status: STATUS_LABEL.Draft,
  });

  const { announcements: publishedAnnouncements } = useQueryAnnouncements({
    pageNumber: 0,
    limit: 1,
    status: STATUS_LABEL.Published,
  });

  const tabs = [
    {
      key: "draft",
      label: "Draft",
      count: computeTabCount(draftAnnouncements?.total),
      component: <List status={STATUS_LABEL.Draft} />,
    },
    {
      key: "publish",
      label: "Publish",
      count: computeTabCount(publishedAnnouncements?.total),
      component: <List status={STATUS_LABEL.Published} />,
    },
  ];

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
