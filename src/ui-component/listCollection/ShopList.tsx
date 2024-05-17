import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { ReactNode } from "react";
import { ShopProps, TableHeaderProps } from "../../types/types";
import { gray14, primaryDark } from "../../store/constant";
import ViewCounters from "../../views/pages/merchantApplication/counterManagement/ViewCounters";
import EyeIcon from "../EyeIcon";
import EditIcon from "../EditIcon";
import DeleteIcon from "../DeleteIcon";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonComponent, EnabledLabel, Status } from "../CustomizeComponent";
import AddIcon from "@mui/icons-material/Add";
import useQueryAllCountersByShopId from "../../hooks/useQueryAllCountersByShopId";
import {
  COUNTER_CREATE_URL,
  SHOP_DETAIL_URL,
  SHOP_UPDATE_URL,
} from "../../routes/Routes";

const ExpandableShop = ({
  children,
  shop,
  onDelete,
  onEdit,
  isExpandable,
  ...otherProps
}: {
  children: ReactNode;
  shop: ShopProps;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  isExpandable: boolean;
}) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { businessId } = useParams();

  const { counters } = useQueryAllCountersByShopId({ id: shop.id! });

  return (
    <>
      <TableRow {...otherProps}>
        {children}
        <TableCell
          sx={{ display: "flex", justifyContent: "space-between" }}
          align="left"
        >
          <Box display="flex">
            <IconButton
              onClick={() =>
                navigate(
                  SHOP_DETAIL_URL.replace(
                    ":businessId",
                    businessId as string
                  ).replace(":shopId", shop.id)
                )
              }
            >
              <EyeIcon />
            </IconButton>
            {onEdit && (
              <IconButton
                onClick={() =>
                  navigate(
                    SHOP_UPDATE_URL.replace(
                      ":businessId",
                      businessId as string
                    ).replace(":shopId", shop.id as string)
                  )
                }
              >
                <EditIcon />
              </IconButton>
            )}
            {onDelete && (
              <IconButton onClick={() => onDelete(shop.id!)}>
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
          {isExpandable && (
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
          )}
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell
            colSpan={7}
            sx={{
              backgroundColor: gray14,
              paddingTop: "0",
              paddingBottom: "12px",
            }}
          >
            {counters && (
              <ViewCounters
                isExpandable={isExpandable}
                counters={counters}
                shopId={shop.id}
              />
            )}
            <ButtonComponent
              sx={{
                marginTop: "12px",
                border: "1px dashed",
                borderColor: primaryDark,
                borderRadius: "12px",
                display: "flex",
                alightItem: "center",
                justifyContent: "center",
                color: primaryDark,
                width: "100%",
              }}
              onClick={() =>
                navigate(
                  COUNTER_CREATE_URL.replace(
                    ":businessId",
                    businessId as string
                  ).replace(":shopId", shop.id as string)
                )
              }
            >
              <IconButton size="small">
                <AddIcon />
              </IconButton>
              Create Counter
            </ButtonComponent>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default function ShopList({
  shopList,
  tableHeaders,
  onDelete,
  onEdit,
  isExpandable,
}: {
  shopList: ShopProps[];
  tableHeaders?: TableHeaderProps[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isExpandable: boolean;
}) {
  return (
    <TableContainer>
      <Table>
        <TableHead sx={{ backgroundColor: gray14, width: "100%" }}>
          <TableRow>
            {tableHeaders?.map(({ id, label, icon: Icon }) => (
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
          {shopList.map((shop, index) => (
            <ExpandableShop
              shop={shop}
              onDelete={onDelete}
              onEdit={onEdit}
              isExpandable={isExpandable}
              key={index}
            >
              <TableCell>{shop.no}</TableCell>
              <TableCell>{shop.name}</TableCell>
              <TableCell>{shop.counterCount}</TableCell>
              <TableCell>
                <Status status={shop.status} />
              </TableCell>
              <TableCell>
                <EnabledLabel enabledLabel={shop.enabled} />
              </TableCell>
            </ExpandableShop>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
