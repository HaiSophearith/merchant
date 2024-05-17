import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { primaryDark, primaryGray } from "../../../../../store/constant";
import { ShopProps } from "../../../../../types/types";

const AddressInfo = ({ shop }: { shop: ShopProps }) => {
  return (
    <>
      <Grid item md={12} xs={12}>
        <Typography
          sx={{ margin: "24px 0", fontSize: "20px", fontWeight: "500" }}
        >
          Address Information
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
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
                  Province/City
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
                  {shop.province?.name}
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
                  Khan
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
                  {shop.district?.name}
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
                  Sangkat
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
                  {shop.commune?.name}
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
                  Phum/Village
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
                  {shop.village?.name}
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
                  House Numbers, Stree no.
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
                  {shop.addressLine1}
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
                  Latitude & Longitude
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
                  {shop.latitude} , {shop.longitude}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
export default AddressInfo;
