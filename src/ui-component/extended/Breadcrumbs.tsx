import { useEffect, useState } from "react";
import { matchPath } from "react-router";
import { Box, Grid, Typography } from "@mui/material";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { BASE_PATH } from "../../config";
import {
  NavItemType,
  NavItemTypeObject,
  OverrideIcon,
} from "../../types/types";
import { primaryDark } from "../../store/constant";

const linkSX = {
  display: "flex",
  textDecoration: "none",
  alignContent: "center",
  alignItems: "center",
  fontSize: "14px",
  color: primaryDark,
};

interface BreadCrumbSxProps extends React.CSSProperties {
  mb?: string;
  bgcolor?: string;
}

interface BreadCrumbsProps {
  actionStep?: number;
  customActions?: string[];
  card?: boolean;
  divider?: boolean;
  icon?: boolean;
  icons?: boolean;
  maxItems?: number;
  navigation?: NavItemTypeObject;
  rightAlign?: boolean;
  separator?: OverrideIcon;
  title?: boolean;
  titleBottom?: boolean;
  sx?: BreadCrumbSxProps;
}

const Breadcrumbs = ({
  customActions = [],
  actionStep,
  card,
  divider,
  icon,
  icons,
  maxItems,
  navigation,
  rightAlign,
  separator,
  title,
  titleBottom,
  ...others
}: BreadCrumbsProps) => {
  const [main, setMain] = useState<NavItemType | undefined>();
  const [item, setItem] = useState<NavItemType>();
  const [action, setAction] = useState<NavItemType>();

  useEffect(() => {
    navigation?.items?.map((menu: NavItemType, index: number) => {
      if (menu.type && menu.type === "group") {
        if (
          menu?.url &&
          matchPath(BASE_PATH + menu.url, document.location.pathname)
        ) {
          setMain(menu);
          setItem(menu);
        } else {
          getCollapse(menu as { children: NavItemType[]; type?: string });
        }
      }
      return false;
    });
  });

  const getCollapse = (menu: NavItemTypeObject) => {
    if (menu.children) {
      menu.children.filter((collapse: NavItemType) => {
        if (collapse.type && collapse.type === "collapse") {
          getCollapse(collapse as { children: NavItemType[]; type?: string });
        } else if (collapse.type && collapse.type === "item") {
          if (document.location.pathname === BASE_PATH + collapse.url) {
            setMain(menu);
            setItem(collapse);
          } else if (collapse.elements) {
            // eslint-disable-next-line array-callback-return
            collapse.elements.filter((subMenu: NavItemType) => {
              if (
                subMenu.type &&
                subMenu.type === "action" &&
                (matchPath(
                  BASE_PATH + subMenu.url,
                  document.location.pathname
                ) ||
                  matchPath(
                    BASE_PATH + collapse.url,
                    document.location.pathname
                  ))
              ) {
                setMain(menu);
                setItem(collapse);
                setAction(subMenu);
              }
            });
          }
        }

        return false;
      });
    }
  };

  // item separator
  const SeparatorIcon = separator!;
  const separatorIcon = separator && <SeparatorIcon sx={{ width: "10px" }} />;

  let mainContent;
  let itemContent;
  let actionContent;
  let breadcrumbContent: React.ReactElement = <Typography />;
  let itemTitle: NavItemType["title"] = "";
  let actionTitle: NavItemType["title"] = "";

  // collapse item
  if (main && main.type === "collapse") {
    mainContent = <Typography>{main.title}</Typography>;
  }

  // Here is no action
  if ((item && item.type === "item") || (item?.type === "group" && item?.url)) {
    itemTitle = item?.title;
    itemContent = <Typography sx={linkSX}>{itemTitle}</Typography>;

    breadcrumbContent = (
      <Box className="boxoiuytr">
        <Box>
          {title && !titleBottom && (
            <Grid item>
              <Typography sx={{ fontWeight: "14px" }} variant="h1">
                {item?.title}
              </Typography>
            </Grid>
          )}
          <Grid item>
            <MuiBreadcrumbs
              aria-label="breadcrumb"
              maxItems={maxItems || 8}
              separator={separatorIcon}
            >
              {mainContent}
              {itemContent}
            </MuiBreadcrumbs>
          </Grid>
        </Box>
      </Box>
    );
  }

  // There are action
  if (
    (action && action.type === "action") ||
    (action?.type === "group" && action?.url)
  ) {
    actionTitle = action?.title;
    itemTitle = item?.title;

    itemContent = <Typography>{itemTitle}</Typography>;
    actionContent = <Typography sx={linkSX}>{actionTitle}</Typography>;

    if (customActions.length !== 0) {
      actionContent = <Typography sx={linkSX}>{actionTitle}</Typography>;

      // eslint-disable-next-line array-callback-return
      const customItems = customActions?.map((item) => {
        return <>{item}</>;
      });

      breadcrumbContent = (
        <Box>
          <Box>
            {title && titleBottom ? (
              <Grid item>
                <Typography sx={{ fontWeight: "bold" }} variant="h1">
                  {action?.title}
                </Typography>
              </Grid>
            ) : (
              <Typography sx={{ fontWeight: "bold" }} variant="h1">
                {customItems}
              </Typography>
            )}
            <Grid item>
              <MuiBreadcrumbs
                sx={{
                  "& .MuiBreadcrumbs-separator": {
                    width: 16,
                    ml: 1.25,
                    mr: 1.25,
                  },
                }}
                aria-label="breadcrumb"
                maxItems={maxItems || 8}
                separator={separatorIcon}
              >
                {mainContent}
                {itemContent}
                {!!title && !!actionContent}
                {customItems}
              </MuiBreadcrumbs>
            </Grid>
          </Box>
        </Box>
      );
    } else {
      breadcrumbContent = (
        <Box>
          <Box>
            {title && !titleBottom && (
              <Grid item>
                <Typography sx={{ fontWeight: "bold" }} variant="h1">
                  {action?.title}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <MuiBreadcrumbs
                sx={{
                  "& .MuiBreadcrumbs-separator": {
                    width: 16,
                    ml: 1.25,
                    mr: 1.25,
                  },
                }}
                aria-label="breadcrumb"
                maxItems={maxItems || 8}
                separator={separatorIcon}
              >
                {mainContent}
                {itemContent}
                {actionContent}
              </MuiBreadcrumbs>
            </Grid>
          </Box>
        </Box>
      );
    }
  }

  return breadcrumbContent;
};

export default Breadcrumbs;
