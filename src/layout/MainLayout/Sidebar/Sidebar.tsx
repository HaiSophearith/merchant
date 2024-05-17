import { memo, useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import MenuList from "../MenuList/MenuList";
import MiniDrawerStyled from "./MiniDrawerStyled";
import LAYOUT_CONST from "../../../constant";
import useConfig from "../../../hooks/useConfig";
import { drawerWidth, kbDarkGray } from "../../../store/constant";
import { useDispatch, useSelector } from "../../../store/store";
import { openDrawer } from "../../../store/slices/menu";
import Logo from "../../../ui-component/Logo";

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);

  const { drawerType } = useConfig();

  const logo = useMemo(
    () => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          p: 2,
        }}
      >
        <Logo />
      </Box>
    ),
    []
  );

  const drawerContent = (
    <>
      <MenuList />
    </>
  );

  const drawerSX = {
    paddingTop: drawerOpen ? 0 : "16px",
    paddingLeft: drawerOpen ? "16px" : 0,
    paddingRight: drawerOpen ? "16px" : 0,
    marginTop: drawerOpen ? "30px" : "35px",
  };

  const drawer = useMemo(
    () => (
      <>
        {matchDownMd ? (
          <Box sx={drawerSX}>{drawerContent}</Box>
        ) : (
          <Box
            style={{
              borderLeft: "1px solid",
              ...drawerSX,
            }}
          >
            {drawerContent}
          </Box>
        )}
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [matchUpMd, drawerOpen, drawerType]
  );

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : "auto" }}
      aria-label="mailbox folders"
    >
      {matchDownMd ||
      (drawerType === LAYOUT_CONST.MINI_DRAWER && drawerOpen) ? (
        <Drawer
          variant={matchUpMd ? "persistent" : "temporary"}
          anchor="left"
          open={drawerOpen}
          onClose={() => dispatch(openDrawer(!drawerOpen))}
          sx={{
            "& .MuiDrawer-paper": {
              mt: matchDownMd ? 0 : 11,
              zIndex: 1099,
              width: drawerWidth,
              background: kbDarkGray,
              color: theme.palette.text.primary,
              borderRight: "none",
            },
          }}
          ModalProps={{ keepMounted: true }}
          color="inherit"
        >
          {matchDownMd && logo}
          {drawer}
        </Drawer>
      ) : (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          {logo}
          {drawer}
        </MiniDrawerStyled>
      )}
    </Box>
  );
};

export default memo(Sidebar);
