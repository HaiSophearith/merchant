import { useMemo, ReactNode } from "react";
import React from "react";
// material-ui
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import {
  createTheme,
  ThemeOptions,
  ThemeProvider,
  Theme,
  TypographyVariantsOptions,
} from "@mui/material/styles";

// project import
import useConfig from "../hooks/useConfig";
import Palette from "./Palette";
import Typography from "./typography";
import componentStyleOverrides from "./CompStyleOverride";

interface Props {
  children: ReactNode;
}

const Themes = ({ children }: Props) => {
  const {
    borderRadius,
    outlinedFilled,
    fontFamily,
    navType,
    presetColor,
    rtlLayout,
  } = useConfig();

  const theme: Theme = useMemo<Theme>(
    () => Palette(navType, presetColor),
    [navType, presetColor]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeTypography: TypographyVariantsOptions =
    useMemo<TypographyVariantsOptions>(
      () => Typography(theme, borderRadius, fontFamily),
      [theme, borderRadius, fontFamily]
    );

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      direction: rtlLayout ? "rtl" : "ltr",
      palette: theme.palette,
      mixins: {
        toolbar: {
          minHeight: "48px",
          padding: "16px",
          "@media (min-width: 600px)": {
            minHeight: "48px",
          },
        },
      },
      typography: themeTypography,
    }),
    [rtlLayout, theme, themeTypography]
  );

  const themes: Theme = createTheme(themeOptions);
  themes.components = useMemo(
    () => componentStyleOverrides(themes, borderRadius, outlinedFilled),
    [themes, borderRadius, outlinedFilled]
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Themes;
