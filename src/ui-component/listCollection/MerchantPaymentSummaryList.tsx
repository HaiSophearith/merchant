import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { MerchantPaymentSummary, TableHeaderProps } from "../../types/types";
import { gray14 } from "../../store/constant";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";

const merchantPaymentSummaryHeaders: TableHeaderProps[] = [
  {
    id: "Regional/Branch",
    label: "Regional/Branch",
    align: "left",
  },
  {
    id: "Number of Business",
    label: "Number of Business",
    align: "left",
  },
  {
    id: "Number of Shop",
    label: "Number of Shop",
    align: "left",
  },
  {
    id: "Number of Account",
    label: "Number of Account",
    align: "left",
  },
  {
    id: "Total Pay..tion USD",
    label: "Total Pay..tion USD",
    align: "left",
  },
  {
    id: "Total Pay..tion KHR",
    label: "Total Pay..tion KHR",
    align: "left",
  },
];

const MerchantPaymentSummaryList = ({
  merchantPaymentSummaries,
}: {
  merchantPaymentSummaries: MerchantPaymentSummary[];
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
            {merchantPaymentSummaryHeaders?.map((tableHeader) => (
              <TableCell key={tableHeader.id}>
                <TableSortLabel>{tableHeader.label}</TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {merchantPaymentSummaries && (
          <TableBody>
            {merchantPaymentSummaries.map((merchantAndAccountStatus, index) => {
              return (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {merchantAndAccountStatus.regionalName}/
                    {merchantAndAccountStatus.branchName}
                  </TableCell>
                  <TableCell>
                    {merchantAndAccountStatus.totalBusiness}
                  </TableCell>
                  <TableCell>{merchantAndAccountStatus.totalShop}</TableCell>
                  <TableCell>{merchantAndAccountStatus.totalAccount}</TableCell>
                  <TableCell>
                    {merchantAndAccountStatus.totalUsdAmount}
                  </TableCell>
                  <TableCell>
                    {merchantAndAccountStatus.totalKhrAmount}
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
export default MerchantPaymentSummaryList;
