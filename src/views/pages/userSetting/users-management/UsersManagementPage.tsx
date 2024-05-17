import { useState } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import UserList from "../../../../ui-component/listCollection/UserList";
import SearchField from "../../../../ui-component/form/SearchField";
import AddIcon from "@mui/icons-material/Add";
import SelectRoleModal from "../../../../ui-component/modal/SelectRoleModal";
import navigation from "../../../../menu-items/index";
import Breadcrumbs from "../../../../ui-component/extended/Breadcrumbs";
import FilterField from "../../../../ui-component/form/FilterField";
import {
  backgroundGray1,
  orangeMain,
  primaryDark,
  primaryLight,
} from "../../../../store/constant";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import { ButtonComponent } from "../../../../ui-component/CustomizeComponent";

const UsersManagementPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpenSelectUserDialog = () => {
    setOpen(true);
  };
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
            onClick={handleOpenSelectUserDialog}
          >
            <IconButton size="small">
              <AddIcon />
            </IconButton>
            Create User
          </ButtonComponent>
        </Box>

        <Box
          sx={{
            flex: 1,
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
              <Grid item md={6} xs={12}>
                <Box sx={{ marginRight: "16px" }}>
                  <FilterField />
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <FilterField />
              </Grid>
            </Grid>
          </Grid>

          <UserList />
        </Box>
      </Box>
      <SelectRoleModal open={open} handleCloseDialog={handleCloseDialog} />
    </div>
  );
};
export default UsersManagementPage;
