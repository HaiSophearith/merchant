import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { MerchantAndAccountStatus, TableHeaderProps } from "../../types/types";
import { gray14 } from "../../store/constant";
import { ReactComponent as SortIcon } from "../../../src/assets/icons/sort.svg";

const merchantAndAccountStatusHeaders: TableHeaderProps[] = [
  {
    id: "Regional/Branch",
    label: "Regional/Branch",
    align: "left",
  },
  {
    id: "Total Merchant",
    label: "Total Merchant",
    align: "left",
  },
  {
    id: "Total Account",
    label: "Total Account",
    align: "left",
  },
  {
    id: "Merchant Active",
    label: "Merchant Active",
    align: "left",
  },
  {
    id: "Merchant Inactive",
    label: "Merchant Inactive",
    align: "left",
  },
];

const MerchantAndAccountStatusList = ({
  merchantAndAccountStatuses,
}: {
  merchantAndAccountStatuses: MerchantAndAccountStatus[];
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
            {merchantAndAccountStatusHeaders?.map((tableHeader) => (
              <TableCell key={tableHeader.id}>
                <TableSortLabel>{tableHeader.label}</TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {merchantAndAccountStatuses && (
          <TableBody>
            {merchantAndAccountStatuses.map(
              (merchantAndAccountStatus, index) => {
                return (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {merchantAndAccountStatus.regionalName}/
                      {merchantAndAccountStatus.branchName}
                    </TableCell>
                    <TableCell>{merchantAndAccountStatus.totalShop}</TableCell>
                    <TableCell>
                      {merchantAndAccountStatus.totalAccount}
                    </TableCell>
                    <TableCell>
                      {merchantAndAccountStatus.totalActiveShop}
                    </TableCell>
                    <TableCell>
                      {merchantAndAccountStatus.totalInactiveShop}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};
export default MerchantAndAccountStatusList;
