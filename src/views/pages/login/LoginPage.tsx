import React from "react";
import { Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  REACT_APP_SSO_CLIENT_ID,
  REACT_APP_SSO_LOGIN_RESPONSE_TYPE,
  REACT_APP_SSO_LOGIN_SCOPE,
  REACT_APP_SSO_LOGIN_URL,
} from "../../../config";

export const sucessUrl = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ""
}/auth/sso`;
const loginUrl = `${REACT_APP_SSO_LOGIN_URL}?scope=${REACT_APP_SSO_LOGIN_SCOPE}&response_type=${REACT_APP_SSO_LOGIN_RESPONSE_TYPE}&client_id=${REACT_APP_SSO_CLIENT_ID}&redirect_uri=${sucessUrl}`;

const LoginPage = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={4}
        sx={{
          display: matchDownMd ? "none" : "flex",
        }}
      >
        <img
          width={"100%"}
          height={"100%%"}
          src={"https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg"}
          alt="background"
        />
      </Grid>
      <Grid item container direction="column" justifyContent="center" alignItems="center" xs={matchDownMd ? 12 : 8}>
        <Grid
          item
          container
          direction={"column"}
          alignContent={"center"}
          justifyContent={"center"}
          sx={{ height: "90%" }}
          px={2}
        >
          <Typography variant="h2">Hi, Welcome</Typography>
          <Typography variant="body1" mt={2} mb={4}>
            Login to unlock the best of KBPRASAC Merchant Backoffice.
          </Typography>
          <Button
            variant="outlined"
            href={loginUrl}
            sx={{
              paddingLeft: "40px",
              paddingRight: "40px",
              color: "#000",
              borderRadius: "12px",
              borderColor: "#E3E3E3",
            }}
          >
            Login with WSO2
          </Button>
        </Grid>
        <Grid
          item
          container
          alignContent={"center"}
          justifyContent={"space-between"}
          sx={{ height: "10%", borderTop: "1px solid #EFEFEF" }}
          px={3}
        >
          <Typography>KBPRASAC Bank 2023. All rights reserved.</Typography>
          <Typography>Terms of Use</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default LoginPage;
