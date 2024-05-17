import { Theme, TypographyVariantsOptions } from "@mui/material/styles";

const Typography = (
  theme: Theme,
  borderRadius: number,
  fontFamily: string
): TypographyVariantsOptions => ({
  fontFamily,
  h6: {
    fontWeight: 500,
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[600]
        : theme.palette.grey[900],
    fontSize: "0.75rem",
  },
  h5: {
    fontSize: "0.875rem",
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[600]
        : theme.palette.grey[900],
    fontWeight: 500,
  },
  h4: {
    fontSize: "1rem",
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[600]
        : theme.palette.grey[900],
    fontWeight: 600,
  },
  h3: {
    fontSize: "1.25rem",
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[600]
        : theme.palette.grey[900],
    fontWeight: 600,
  },
  h2: {
    fontSize: "1.5rem",
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[600]
        : theme.palette.grey[900],
    fontWeight: 700,
  },
  h1: {
    fontSize: "2.125rem",
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[600]
        : theme.palette.grey[900],
    fontWeight: 700,
  },
  subtitle1: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
  subtitle2: {
    fontSize: "0.75rem",
    fontWeight: 400,
    color: theme.palette.text.secondary,
  },
  caption: {
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
    fontWeight: 400,
  },
  body1: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.334em",
  },
  body2: {
    letterSpacing: "0em",
    fontWeight: 400,
    lineHeight: "1.5em",
    color: theme.palette.text.primary,
  },
  button: {
    textTransform: "capitalize",
  },
});

export default Typography;
