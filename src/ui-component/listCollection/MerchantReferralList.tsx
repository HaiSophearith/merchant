import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { MerchantReferral, TableHeaderProps } from "../../types/types";
import { gray14 } from "../../store/constant";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";

const merchantReferralHeaders: TableHeaderProps[] = [
  {
    id: "Regional/Branch",
    label: "Regional/Branch",
    align: "left",
  },
  {
    id: "No Merchant",
    label: "No Merchant",
    align: "left",
  },
  {
    id: "No Account",
    label: "No Account",
    align: "left",
  },
];

const MerchantReferralList = ({
  merchantReferralItems,
}: {
  merchantReferralItems: MerchantReferral[];
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
            {merchantReferralHeaders?.map((tableHeader) => (
              <TableCell key={tableHeader.id}>
                <TableSortLabel>{tableHeader.label}</TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {merchantReferralItems && (
          <TableBody>
            {merchantReferralItems.map((item, index) => {
              return (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {item.regionalName}/{item.branchName}
                  </TableCell>
                  <TableCell>{item.totalShop}</TableCell>
                  <TableCell>{item.totalAccount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};
export default MerchantReferralList;
