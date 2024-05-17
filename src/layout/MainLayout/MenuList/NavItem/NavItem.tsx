import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  ButtonBase,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LAYOUT_CONST from "../../../../constant";
import useConfig from "../../../../hooks/useConfig";
import { useDispatch, useSelector } from "../../../../store/store";
import {
  activeID,
  activeItem,
  openDrawer,
} from "../../../../store/slices/menu";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { NavItemType } from "../../../../types/types";
import {
  orangeMain,
  primaryDark,
  primaryLight,
  secondaryKbDarkGray,
} from "../../../../store/constant";

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

interface NavItemProps {
  item: NavItemType;
  level: number;
  parentId?: string;
  isParents?: boolean;
  isItem?: boolean;
}

const NavItem = ({
  item,
  level,
  parentId,
  isParents = false,
  isItem = false,
}: NavItemProps) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { layout, borderRadius } = useConfig();

  const { selectedItem, drawerOpen } = useSelector((state) => state.menu);
  const isSelected = selectedItem.findIndex((id) => id === item.id) > -1;

  const Icon = item?.icon!;
  const itemIcon = item?.icon ? (
    <Icon
      stroke="1.5"
      style={{
        color: isSelected
          ? theme.palette.secondary.main
          : theme.palette.text.primary,
        ...(layout === LAYOUT_CONST.HORIZONTAL_LAYOUT &&
          isParents && { fontSize: 20, stroke: "1.5" }),
      }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        color: isSelected ? orangeMain : primaryLight,
        width: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 8,
        height: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 8,
      }}
      fontSize={level > 0 ? "inherit" : "medium"}
    />
  );

  const itemHandler = (id: string) => {
    dispatch(activeItem([id]));
    if (matchesSM) dispatch(openDrawer(false));
    dispatch(activeID(parentId));
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch(activeItem([item.id]));
    }
    // eslint-disable-next-line
  }, [pathname]);

  const textColor = theme.palette.mode === "dark" ? "grey.400" : "text.primary";
  const iconSelectedColor =
    theme.palette.mode === "dark" && drawerOpen
      ? "text.primary"
      : "secondary.main";
  return (
    <>
      {layout === LAYOUT_CONST.VERTICAL_LAYOUT ||
      (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd) ? (
        <ListItemButton
          component={Link}
          to={item.url!}
          disabled={item.disabled}
          disableRipple={!drawerOpen}
          sx={{
            color: primaryLight,
            zIndex: 1201,
            borderRadius: `${borderRadius}px`,
            mb: 0.5,
            pl: drawerOpen ? `${level * 24}px` : 1.25,
            ...(drawerOpen &&
              level === 1 &&
              theme.palette.mode !== "dark" && {
                "&:hover": {
                  background: orangeMain,
                },
                "&.Mui-selected": {
                  background: secondaryKbDarkGray,
                  color: primaryDark,
                },
              }),
            ...((!drawerOpen || level !== 1) && {
              py: level === 1 ? 0 : 1,
              "&:hover": {
                bgcolor: "transparent",
              },
              "&.Mui-selected": {
                "&:hover": {
                  bgcolor: "transparent",
                },
                bgcolor: "transparent",
              },
            }),
          }}
          selected={isSelected}
          onClick={() => itemHandler(item.id!)}
        >
          <ButtonBase
            aria-label="theme-icon"
            sx={{ borderRadius: `${borderRadius}px` }}
            disableRipple={drawerOpen}
          >
            <ListItemIcon
              sx={{
                minWidth: level === 1 ? 36 : 18,
                color: isSelected ? iconSelectedColor : textColor,
                ...(!drawerOpen &&
                  level === 1 && {
                    borderRadius: `${borderRadius}px`,
                    width: 46,
                    height: 46,
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? theme.palette.secondary.main + 25
                          : secondaryKbDarkGray,
                    },
                    ...(isSelected && {
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? theme.palette.secondary.main + 25
                          : secondaryKbDarkGray,
                      "&:hover": {
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? theme.palette.secondary.main + 30
                            : secondaryKbDarkGray,
                      },
                    }),
                  }),
              }}
            >
              {itemIcon}
            </ListItemIcon>
          </ButtonBase>

          {(drawerOpen || (!drawerOpen && level !== 1)) && (
            <ListItemText
              primary={
                <Typography
                  variant={isSelected ? "h5" : "body1"}
                  color={!isItem && isSelected ? orangeMain : primaryLight}
                >
                  {item.title}
                </Typography>
              }
              secondary={
                item.caption && (
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "0.6875rem",
                      fontWeight: 500,
                      color: theme.palette.text.secondary,
                      textTransform: "capitalize",
                    }}
                    display="block"
                    gutterBottom
                  >
                    {item.caption}
                  </Typography>
                )
              }
            />
          )}
        </ListItemButton>
      ) : (
        <ListItemButton
          component={Link}
          to={item.url!}
          disabled={item.disabled}
          {...(isParents && {
            onClick: () => {
              dispatch(activeID(item.id!));
            },
          })}
          sx={{
            borderRadius: isParents ? `${borderRadius}px` : 0,
            mb: isParents ? 0 : 0.5,
            alignItems: "flex-start",
            backgroundColor: level > 1 ? "transparent !important" : "inherit",
            py: 1,
            pl: 2,
            mr: isParents ? 1 : 0,
          }}
          selected={isSelected}
          onClick={() => itemHandler(item.id!)}
        >
          <ListItemIcon
            sx={{
              my: "auto",
              minWidth: !item?.icon ? 18 : 36,
            }}
          >
            {itemIcon}
          </ListItemIcon>

          <ListItemText
            primary={
              <Typography variant={isSelected ? "h5" : "body1"} color="inherit">
                {item.title}
              </Typography>
            }
            secondary={
              item.caption && (
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    color: theme.palette.text.secondary,
                    textTransform: "capitalize",
                  }}
                  display="block"
                  gutterBottom
                >
                  {item.caption}
                </Typography>
              )
            }
          />
        </ListItemButton>
      )}
    </>
  );
};

export default NavItem;
