import React from "react";
import EyeIcon from "../EyeIcon";
import { ReferralProps, TableHeaderProps } from "../../types/types";
import { format } from "date-fns";
import {
  TableContainer,
  Table,
  TableCell,
  TableSortLabel,
  TableBody,
  IconButton,
  TableHead,
  TableRow,
} from "@mui/material";
import { frontDate, tableHeaderBackground } from "../../store/constant";
import { ReactComponent as sortIcon } from "../../assets/icons/sort.svg";
import { useNavigate } from "react-router";
import { REFERRAL_DETAIL_URL } from "../../routes/Routes";

const referralHeader: TableHeaderProps[] = [
  {
    id: "No",
    label: "No",
    icon: sortIcon,
  },
  {
    id: "Referrer Code",
    label: "Referrer Code",
    icon: sortIcon,
  },
  {
    id: "Referrer Name",
    label: "Referrer Name",
  },
  {
    id: "Phone Number",
    label: "Phone Number",
  },
  {
    id: "Referee Name",
    label: "Referee Name",
  },
  {
    id: "Onboarding Date",
    label: "Onboarding Date",
  },
  {
    id: "Action",
    label: "Action",
  },
];

export const ReferralList = ({ referrals }: { referrals: ReferralProps[] }) => {
  const navigate = useNavigate();
  return (
    <TableContainer>
      <Table>
        <TableHead
          sx={{ backgroundColor: tableHeaderBackground, width: "100%" }}
        >
          <TableRow>
            {referralHeader?.map(({ id, label, icon: Icon }) => (
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
          {referrals.map((referral, index) => {
            return (
              <TableRow key={index} sx={{ width: "100%" }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{referral.referralCode}</TableCell>
                <TableCell>{referral?.referrerName}</TableCell>
                <TableCell>{referral?.phoneNumber}</TableCell>
                <TableCell>{referral.referrerCustomer.fullName}</TableCell>
                <TableCell>
                  {format(new Date(referral.onboardedDate), frontDate)}
                </TableCell>
                <TableCell align="left">
                  <IconButton
                    onClick={() =>
                      navigate(
                        REFERRAL_DETAIL_URL.replace(":referralId", referral.id)
                      )
                    }
                  >
                    <EyeIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
