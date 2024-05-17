import React, { useState } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import SearchField from "../../../../ui-component/form/SearchField";
import AddIcon from "@mui/icons-material/Add";
import SelectRoleModal from "../../../../ui-component/modal/SelectRoleModal";
import navigation from "../../../../menu-items/index";
import Breadcrumbs from "../../../../ui-component/extended/Breadcrumbs";
import RoleList from "../../../../ui-component/listCollection/RoleList";
import {
  backgroundGray1,
  orangeMain,
  primaryDark,
  primaryLight,
} from "../../../../store/constant";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import { ButtonComponent } from "../../../../ui-component/CustomizeComponent";

const RolesManagementPage = () => {
  const [open, setOpen] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{ padding: "24px", height: "84vh" }}>
        <Box
          sx={{
            paddingBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Breadcrumbs
            separator={FiberManualRecord}
            navigation={navigation}
            icon
            title
            rightAlign
          />

          <ButtonComponent
            sx={{
              color: primaryDark,
              backgroundColor: orangeMain,
            }}
            href={"/user/roles/create"}
          >
            <IconButton size="small">
              <AddIcon />
            </IconButton>
            Create Role
          </ButtonComponent>
        </Box>

        <Box
          sx={{
            borderRadius: "12px",
            border: "0.5px solid",
            borderColor: backgroundGray1,
            background: primaryLight,
          }}
        >
          <Grid container>
            <Grid sx={{ display: "flex", margin: "16px" }} item sm={4} md={8}>
              <Grid item md={6} xs={12}>
                <Box sx={{ marginRight: "16px" }}>
                  <SearchField />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <RoleList />
        </Box>
      </Box>
      <SelectRoleModal open={open} handleCloseDialog={handleCloseDialog} />
    </div>
  );
};
export default RolesManagementPage;
