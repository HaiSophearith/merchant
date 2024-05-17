import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { MerchantCategoryReport, TableHeaderProps } from "../../types/types";
import { gray14 } from "../../store/constant";
import { ReactComponent as SortIcon } from "../../../src/assets/icons/sort.svg";

const merchantCategoryHeaders: TableHeaderProps[] = [
  {
    id: "Regional/Branch",
    label: "Regional/Branch",
    align: "left",
  },
  {
    id: "Branch",
    label: "Branch",
    align: "left",
  },
  {
    id: "Number of Merchant",
    label: "Number of Merchant",
    align: "left",
  },
  {
    id: "Number of Account",
    label: "Number of Account",
    align: "left",
  },
  {
    id: "Corporate",
    label: "Corporate",
    align: "left",
  },
  {
    id: "Retailer",
    label: "Retailer",
    align: "left",
  },
];

const MerchantCategoryList = ({
  merchantCategoryItems,
}: {
  merchantCategoryItems: MerchantCategoryReport[];
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead sx={{ backgroundColor: gray14, width: "100%" }}>
          <TableRow>
            <TableCell>
              <TableSortLabel active IconComponent={SortIcon}>
                No
              </TableSortLabel>
            </TableCell>
            {merchantCategoryHeaders?.map((tableHeader) => (
              <TableCell key={tableHeader.id}>
                <TableSortLabel>{tableHeader.label}</TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {merchantCategoryItems && (
          <TableBody>
            {merchantCategoryItems.map((item, index) => {
              return (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.regionalName}</TableCell>
                  <TableCell>{item.totalBranch}</TableCell>
                  <TableCell>{item.totalShop}</TableCell>
                  <TableCell>{item.totalAccount}</TableCell>
                  <TableCell>{item.totalCorporate}</TableCell>
                  <TableCell>{item.totalRetailer}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};
export default MerchantCategoryList;
