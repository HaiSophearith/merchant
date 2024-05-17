import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import color from "../assets/scss/_themes-vars.module.scss";

const Palette = (navType: PaletteMode, presetColor: string) => {
  let themeColors = color;

  return createTheme({
    palette: {
      mode: navType,
      common: {
        black: themeColors.darkPaper,
      },
      primary: {
        light: navType === "dark" ? themeColors.darkPrimaryLight : themeColors.primaryLight,
        main: navType === "dark" ? themeColors.darkPrimaryMain : themeColors.primaryMain,
        dark: navType === "dark" ? themeColors.darkPrimaryDark : themeColors.primaryDark,
        200: navType === "dark" ? themeColors.darkPrimary200 : themeColors.primary200,
        800: navType === "dark" ? themeColors.darkPrimary800 : themeColors.primary800,
      },
    },
  });
};

export default Palette;
