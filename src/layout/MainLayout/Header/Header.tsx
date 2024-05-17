import { useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Typography, useMediaQuery } from "@mui/material";
import LAYOUT_CONST from "../../../constant";
import useConfig from "../../../hooks/useConfig";

import { useDispatch, useSelector } from "../../../store/store";
import { openDrawer } from "../../../store/slices/menu";

import MenuIcon from "../../../ui-component/MenuIcon";
import Bell from "../../../ui-component/Bell";
import Profile from "../../../ui-component/Profile";
import Logo from "../../../ui-component/Logo";
import { orange14 } from "../../../store/constant";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const { layout } = useConfig();

  return (
    <>
      <Box
        sx={{
          width: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Logo />
        {(layout === LAYOUT_CONST.VERTICAL_LAYOUT ||
          (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd)) && (
          <Avatar
            variant="rounded"
            sx={{
              cursor: "pointer",
              borderRadius: "8px",
              width: "34px",
              height: "34px",
              fontSize: "1.2rem",
              overflow: "hidden",
              transition: "all .2s ease-in-out",
              background: orange14,
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary.main
                  : theme.palette.secondary.dark,
            }}
            onClick={() => dispatch(openDrawer(!drawerOpen))}
            color="inherit"
          >
            <MenuIcon />
          </Avatar>
        )}
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      <Bell />
      <Grid sx={{ mr: 3, ml: 5 }} item>
        <Typography align="right" component="div" variant="h4">
          David Ly
        </Typography>
        <Typography align="right" component="div" variant="subtitle2">
          Super Admin
        </Typography>
      </Grid>
      <Profile />
    </>
  );
};

export default Header;
