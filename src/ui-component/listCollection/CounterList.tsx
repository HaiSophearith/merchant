import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { CounterProps, TableHeaderProps } from "../../types/types";
import { gray14 } from "../../store/constant";
import EyeIcon from "../EyeIcon";
import { EnabledLabel } from "../CustomizeComponent";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";

const counterHeaders: TableHeaderProps[] = [
  {
    id: "No",
    label: "No",
    icon: SortIcon,
  },
  {
    id: "Counter Name",
    label: "Counter Name",
  },
  {
    id: "Created Date",
    label: "Created Date",
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

const CounterList = ({ counters }: { counters: CounterProps[] }) => {
  return (
    <TableContainer>
      <Table sx={{ width: "100%" }}>
        <TableHead sx={{ backgroundColor: gray14, width: "100%" }}>
          <TableRow>
            {counterHeaders?.map(({ id, label, icon: Icon }) => (
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
        {counters && (
          <TableBody>
            {counters.map((counter, index) => {
              return (
                <>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{counter.name}</TableCell>
                  <TableCell>02 Aug 2023</TableCell>
                  <TableCell>
                    <EnabledLabel enabledLabel={counter.enabled} />
                  </TableCell>
                  <TableCell>
                    <EyeIcon />
                  </TableCell>
                </>
              );
            })}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};
export default CounterList;
