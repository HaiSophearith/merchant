import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import {
  Grid,
  IconButton,
  Typography,
  TablePagination,
  Box,
} from "@mui/material";
import Breadcrumbs from "../../../../../ui-component/extended/Breadcrumbs";
import navigation from "../../../../../menu-items/index";
import {
  BreadCrumbIncludeBtn,
  ButtonCustom,
  GridFooter,
  GridListContainer,
} from "../../../../../ui-component/CustomizeComponent";
import AddIcon from "@mui/icons-material/Add";
import ShopList from "../../../../../ui-component/listCollection/ShopList";
import useQueryShopsByBusiness from "../../../../../hooks/useQueryShopsByBusiness";
import useReactSearchParams from "../../../../../hooks/useReactSearchParams";
import { ChangeEvent, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import useMutationDeleteShop from "../../../../../hooks/useMutationDeleteShop";
import DeleteModal from "../../../../../ui-component/modal/DeleteModal";
import { TableHeaderProps } from "../../../../../types/types";
import useQueryBusinessDetail from "../../../../../hooks/useQueryBusinessDetail";
import { ReactComponent as SortIcon } from "../../../../../assets/icons/sort.svg";
import { BUSINESS_URL, SHOP_CREATE_URL } from "../../../../../routes/Routes";
import { useNavigate } from "react-router-dom";

const ViewShops = () => {
  const navigate = useNavigate();
  const { businessId } = useParams();
  const [searchParams] = useReactSearchParams();
  const pageNumber = Number(searchParams.get("pageNumber") || 0);
  const limit = Number(searchParams.get("limit") || 10);
  const [page, setPage] = useState<number>(pageNumber);
  const [rowsPerPage, setRowsPerPage] = useState<number>(limit);
  const { eachBusiness } = useQueryBusinessDetail({
    businessId: businessId!,
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
  ) => {
    event?.target.value && setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  const { shopList, total } = useQueryShopsByBusiness({
    pageNumber: page,
    limit: rowsPerPage,
    businessId: businessId!,
  });
  const { mutate: deleteShop } = useMutationDeleteShop();

  const [open, setOpen] = useState(false);
  const [deleteShopId, setDeleteShopId] = useState<string>();

  const handleOpenDeleteModal = (shopId: string) => {
    setOpen(!open);
    setDeleteShopId(shopId);
  };

  const handleCancelModal = () => {
    setOpen(false);
    setDeleteShopId(undefined);
  };

  const handleConfirmDelete = useCallback(() => {
    if (deleteShopId) {
      deleteShop({
        businessId: businessId!,
        shopId: deleteShopId,
      });
      handleCancelModal();
    }
  }, [businessId, deleteShop, deleteShopId]);

  const shopHeader: TableHeaderProps[] = [
    {
      id: "No",
      label: "No",
      icon: SortIcon,
    },
    {
      id: "Shop Name",
      label: "Shop Name",
      icon: SortIcon,
    },
    {
      id: "Counter",
      label: "Counter",
    },
    {
      id: "Review Status",
      label: "Review Status",
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

  return (
    <Box>
      <BreadCrumbIncludeBtn>
        <Breadcrumbs
          customActions={[eachBusiness?.name!]}
          separator={FiberManualRecord}
          navigation={navigation}
          icon
          title
          rightAlign
        />

        <ButtonCustom
          buttonLabel="Create Shop"
          variant="orangeBtn"
          onClick={() =>
            navigate(
              SHOP_CREATE_URL.replace(":businessId", businessId as string)
            )
          }
        >
          <IconButton size="small">
            <AddIcon />
          </IconButton>
        </ButtonCustom>
      </BreadCrumbIncludeBtn>

      <Box sx={{ padding: "24px", paddingTop: "0" }}>
        <GridListContainer>
          <Grid>
            <Grid sx={{ display: "flex", margin: "16px" }} item sm={4} md={8}>
              <Typography variant="h2">Shop</Typography>
            </Grid>
          </Grid>

          <ShopList
            shopList={shopList}
            tableHeaders={shopHeader}
            isExpandable
            onDelete={handleOpenDeleteModal}
            onEdit={() => {}}
          />
          <TablePagination
            sx={{ padding: "24px" }}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </GridListContainer>
      </Box>

      <GridFooter gridSize="oneBtn">
        <ButtonCustom
          onClick={() => navigate(BUSINESS_URL)}
          variant="blackBtn"
          buttonLabel="Back"
        />
      </GridFooter>

      <DeleteModal
        handleOnConfirm={handleConfirmDelete}
        handleOnCancel={handleCancelModal}
        open={open}
        description="Are you sure you want to delete this Role? You can write your reason below:"
      />
    </Box>
  );
};
export default ViewShops;
