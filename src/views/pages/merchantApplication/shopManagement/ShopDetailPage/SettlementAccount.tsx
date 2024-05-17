import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { primaryDark, primaryGray } from "../../../../../store/constant";
import { BankAccountNumberProps } from "../../../../../types/types";

const SettlementAccount = ({
  bankAccounts,
}: {
  bankAccounts: BankAccountNumberProps[];
}) => {
  return (
    <>
      <Grid item md={12} xs={12}>
        <Typography
          sx={{ margin: "24px 0", fontSize: "20px", fontWeight: "500" }}
        >
          Settlement Accounts
        </Typography>
      </Grid>
      {bankAccounts.map((bankAccount) => {
        return (
          <Grid key={bankAccount.bankAccountNumber} item md={12} xs={12}>
            <Box
              sx={{
                padding: "24px",
                background: "rgba(247, 247, 247, 0.97)",
                borderRadius: "12px",
                marginTop: "24px",
              }}
            >
              <Grid container spacing={2}>
                <Grid container item xs={12}>
                  <Grid item xs={12} sm={5}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: primaryGray,
                      }}
                    >
                      Account Currency
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: primaryDark,
                      }}
                    >
                      {bankAccount.currency}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xs={12}>
                  <Grid item xs={12} sm={5}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: primaryGray,
                      }}
                    >
                      Account Name
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: primaryDark,
                      }}
                    >
                      {bankAccount.bankAccountHolderName}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xs={12}>
                  <Grid item xs={12} sm={5}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: primaryGray,
                      }}
                    >
                      Account Number
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: primaryDark,
                      }}
                    >
                      {"Savings account | "}
                      {bankAccount.bankAccountNumber}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        );
      })}
    </>
  );
};

export default SettlementAccount;
