import { useState } from "react";
import DeleteIcon from "../DeleteIcon";
import EyeIcon from "../EyeIcon";
import EditIcon from "../EditIcon";
import { BusinessProps, TableHeaderProps } from "../../types/types";
import {
  TableContainer,
  Table,
  TableCell,
  TableSortLabel,
  TableBody,
  IconButton,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteModal from "../modal/DeleteModal";
import { orangeMain, tableHeaderBackground } from "../../store/constant";
import { Status } from "../CustomizeComponent";
import { useNavigate } from "react-router-dom";
import capitalizeFirstCharacter from "../../utils/convertStringToCapitalize";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";
import useMutationDeleteBusinessDetail from "../../hooks/useMutationDeleteBusinessDetail";
import {
  BUSINESS_DETAIL_URL,
  BUSINESS_UPDATE_URL,
  VIEW_SHOP,
} from "../../routes/Routes";

const businessHeader: TableHeaderProps[] = [
  {
    id: "No",
    label: "No",
    icon: SortIcon,
  },
  {
    id: "Business Name",
    label: "Business Name",
    icon: SortIcon,
  },
  {
    id: "Merchant Type",
    label: "Merchant Type",
    icon: SortIcon,
  },
  {
    id: "Business Category",
    label: "Business Category",
  },
  {
    id: "Shop",
    label: "Shop",
  },
  {
    id: "Review Status",
    label: "Review Status",
  },
  {
    id: "Action",
    label: "Action",
  },
];

interface BusinessListProps {
  businesses: BusinessProps[];
}

export const BusinessList = ({ businesses }: BusinessListProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [businessId, setBusinessId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (!id) return;
    setBusinessId(id);
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
    setBusinessId(null);
  };

  const { mutateAsync: deleteBusiness } = useMutationDeleteBusinessDetail();

  const handleConfirmDelete = () => {
    if (!businessId) return;
    deleteBusiness({ id: businessId });
    handleCloseDialog();
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead
            sx={{ backgroundColor: tableHeaderBackground, width: "100%" }}
          >
            <TableRow>
              {businessHeader?.map(({ id, label, icon: Icon }) => (
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
            {businesses.map((business, index) => {
              return (
                <TableRow key={index} sx={{ width: "100%" }}>
                  <TableCell>{business.no}</TableCell>
                  <TableCell>{business.name}</TableCell>
                  <TableCell>
                    {capitalizeFirstCharacter(business.merchantType)}
                  </TableCell>
                  <TableCell>{business.category.name}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        navigate(VIEW_SHOP.replace(":businessId", business.id))
                      }
                    >
                      <Typography
                        sx={{
                          color: orangeMain,
                          textDecorationLine: "underline",
                          textDecorationColor: orangeMain,
                        }}
                      >
                        {business.shopCount}
                      </Typography>
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Status status={business.status} />
                  </TableCell>
                  <TableCell align="left">
                    <IconButton
                      color="secondary"
                      size="large"
                      aria-label="View"
                      onClick={() =>
                        navigate(
                          BUSINESS_DETAIL_URL.replace(":id", business.id)
                        )
                      }
                    >
                      <EyeIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      size="large"
                      aria-label="View"
                      onClick={() =>
                        navigate(
                          BUSINESS_UPDATE_URL.replace(":id", business.id)
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      size="large"
                      aria-label="View"
                      onClick={() => handleDelete(business.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteModal
        open={open}
        description={"Are you sure you want to delete this Business?"}
        handleOnCancel={handleCloseDialog}
        handleOnConfirm={handleConfirmDelete}
      />
    </>
  );
};
