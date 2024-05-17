import React from "react";
import Breadcrumbs from "../../../../../ui-component/extended/Breadcrumbs";
import navigation from "../../../../../menu-items/index";
import TextInputField from "../../../../../ui-component/form/TextInputField";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { allPermissions, selectPermissions } from "../../../../../store/store";
import {
  backgroundGray1,
  lineGray,
  orangeMain,
  primaryDark,
  primaryLight,
} from "../../../../../store/constant";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import { ButtonComponent } from "../../../../../ui-component/CustomizeComponent";

const RoleCreatePage = () => {
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

        <Box sx={{ paddingTop: "24px" }}>
          <Grid
            sx={{
              width: "100%",
              border: "0.5px solid",
              borderColor: backgroundGray1,
              backgroundColor: primaryLight,
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <Box sx={{ width: "70%" }}>
              <Typography
                sx={{ fontWeight: "bold", padding: "0 0 24px 0" }}
                variant="h5"
              >
                Role Information
              </Typography>
              <Grid sx={{ my: 2 }}>
                <TextInputField label={"Role Name"}></TextInputField>
              </Grid>
              <Grid>
                <TextInputField label={"Description"}></TextInputField>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    sx={{ fontWeight: "bold", padding: "0 0 24px 0" }}
                    variant="h5"
                  >
                    Permission
                  </Typography>
                  <Box sx={{ borderRight: "0.5px solid gray" }}>
                    <Box>
                      {allPermissions.map((permission) => {
                        return (
                          <Box
                            sx={{
                              width: "250px",
                              height: "48px",
                              borderRadius: "8px",
                              px: "17px",
                            }}
                          >
                            {permission.value}
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "878px",
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      color: orangeMain,
                      fontWeight: "bold",
                      padding: "0 0 24px 0",
                    }}
                    variant="body1"
                  >
                    Select All
                  </Typography>
                  <Box>
                    <FormControl sx={{ width: "100%" }}>
                      {selectPermissions.map((selectPermission) => {
                        return (
                          <FormControlLabel
                            control={<Checkbox />}
                            labelPlacement="start"
                            label={selectPermission.lable}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              py: "10px",
                              borderBottom: "0.5px solid gray",
                            }}
                          ></FormControlLabel>
                        );
                      })}
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Box>
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
        <>
          <Grid
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <ButtonComponent
              sx={{
                color: primaryDark,
                backgroundColor: primaryLight,
                padding: "16px 14px",
                fontWeight: "bold",
                height: "40px",
                marginRight: "18px",
                border: "1.5px solid",
                borderColor: lineGray,
                borderRadius: "10px",
              }}
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent
              sx={{
                backgroundColor: orangeMain,
                color: primaryDark,
              }}
            >
              Create
            </ButtonComponent>
          </Grid>
        </>
      </Grid>
    </div>
  );
};
export default RoleCreatePage;
