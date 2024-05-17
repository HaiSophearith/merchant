import React from "react";
import {
  Avatar,
  Box,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import {
  backgroundGray1,
  gridSpacing,
  lineGray,
  orangeMain,
  primaryDark,
  primaryLight,
} from "../../../../../store/constant";
import { options, allLabels } from "../../../../../store/store";
import TextInputField from "../../../../../ui-component/form/TextInputField";
import Breadcrumbs from "../../../../../ui-component/extended/Breadcrumbs";
import navigation from "../../../../../menu-items/index";
import { IconChevronDown } from "@tabler/icons";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import { ButtonComponent } from "../../../../../ui-component/CustomizeComponent";

const UserCreatePage = () => {
  const src =
    "https://marketplace.canva.com/EAFXS8-cvyQ/1/0/1600w/canva-brown-and-light-brown%2C-circle-framed-instagram-profile-picture-2PE9qJLmPac.jpg";

  return (
    <div>
      <Box sx={{ padding: "24px", height: "84vh" }}>
        <Breadcrumbs
          separator={FiberManualRecord}
          navigation={navigation}
          icon
          title
          rightAlign
        />
        <Grid container>
          <Grid sx={{ marginTop: "24px" }} item sm={6} md={9}>
            <Grid
              sx={{
                border: "0.5px solid",
                borderColor: backgroundGray1,
                backgroundColor: primaryLight,
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <Typography
                sx={{ fontWeight: "bold", padding: "0 0 24px 0" }}
                variant="h5"
              >
                User Information
              </Typography>
              <Grid container spacing={gridSpacing}>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      User Name
                    </InputLabel>
                    <Select
                      sx={{ borderRadius: "12px" }}
                      fullWidth
                      label="User Name"
                      IconComponent={IconChevronDown}
                      defaultValue="none"
                      native
                    >
                      <option value="none" disabled>
                        User Name
                      </option>
                      {options.map((option) => {
                        return (
                          <option value={option.value}>{option.label}</option>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                {allLabels.map((eachLabel) => {
                  return (
                    <Grid item md={6} xs={12}>
                      <TextInputField
                        key={eachLabel.id}
                        label={eachLabel.label}
                      ></TextInputField>
                    </Grid>
                  );
                })}
              </Grid>

              <Typography
                sx={{ fontWeight: "bold", padding: "0 0 24px 0" }}
                variant="h5"
              >
                Role Information
              </Typography>
              <Grid container spacing={gridSpacing}>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      sx={{ borderRadius: "12px" }}
                      fullWidth
                      label="Role"
                      IconComponent={IconChevronDown}
                      defaultValue="none"
                      native
                    >
                      <option value="none" disabled>
                        Role
                      </option>
                      {options.map((option) => {
                        return (
                          <option value={option.value}>{option.label}</option>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      KB PRASAC Bank
                    </InputLabel>
                    <Select
                      sx={{ borderRadius: "12px" }}
                      fullWidth
                      label="KB PRASAC Bank"
                      IconComponent={IconChevronDown}
                      defaultValue="none"
                      native
                    >
                      <option value="none" disabled>
                        Branch
                      </option>
                      {options.map((option) => {
                        return (
                          <option value={option.value}>{option.label}</option>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            sx={{
              height: "280px",
              margin: "24px 0 0 24px",
              border: "0.5px solid",
              borderColor: backgroundGray1,
              backgroundColor: primaryLight,
              borderRadius: "12px",
              padding: "24px",
            }}
            item
            sm={7}
            md={2.8}
          >
            <Typography sx={{ fontWeight: "14px" }} variant="h6">
              Profile Photo
            </Typography>
            <Grid item xs={12}>
              <Avatar
                sx={{ width: "206px", height: "206px", margin: "0 auto" }}
                alt="User 1"
                src={src}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Grid
        sx={{
          width: "100%",
          height: "10%",
          backgroundColor: primaryLight,
          boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
          bottom: 0,
          padding: "20px 24px",
        }}
        xs={12}
        container
      >
        <Grid
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <ButtonComponent
            sx={{
              color: primaryDark,
              backgroundColor: primaryLight,
              border: "1.5px solid",
              borderColor: lineGray,
              width: "135px",
            }}
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent
            sx={{
              backgroundColor: orangeMain,
              color: primaryDark,
              width: "135px",
            }}
          >
            Create
          </ButtonComponent>
        </Grid>
      </Grid>
    </div>
  );
};
export default UserCreatePage;
