import {
  Box,
  Button,
  ButtonProps,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  backBtnBackground,
  blueMain,
  disableColor,
  error,
  gray14,
  green15,
  lineGray,
  orangeMain,
  primaryDark,
  primaryGray,
  primaryGreen,
  primaryLight,
} from "../store/constant";
import { ReactNode } from "react";
import { STATUS_LABEL } from "../types/types";

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

const STATUS: Record<
  STATUS_LABEL,
  { labelText: string; color: string; backgroundColor?: string }
> = {
  [STATUS_LABEL.Verified]: { labelText: "Verified", color: blueMain },
  [STATUS_LABEL.Unverified]: { labelText: "Unverified", color: orangeMain },
  [STATUS_LABEL.Escalated]: { labelText: "Escalated", color: primaryGray },
  [STATUS_LABEL.Draft]: {
    labelText: "Draft",
    color: primaryGray,
    backgroundColor: gray14,
  },
  [STATUS_LABEL.Published]: {
    labelText: "Publish",
    color: primaryGreen,
    backgroundColor: green15,
  },
};

interface ButtonCustomProps extends Omit<ButtonProps, "variant"> {
  variant?: string;
  buttonLabel?: string;
  children?: ReactNode;
}

export const ButtonComponent = styled(Button)({
  padding: "16px 14px",
  fontWeight: "bold",
  height: "40px",
  border: "none",
  borderRadius: "10px",
  minWidth: "135px",
  textTransform: "capitalize",
  " &:hover": {
    backgroundColor: primaryGray,
  },
});

export const ButtonCustom = ({
  variant,
  buttonLabel,
  children,
  onClick,
  sx,
  ...props
}: ButtonCustomProps) => {
  switch (variant) {
    case "orangeBtn":
      return (
        <ButtonComponent
          onClick={onClick}
          {...props}
          sx={{ backgroundColor: orangeMain, color: primaryDark, ...sx }}
        >
          {children}
          {buttonLabel}
        </ButtonComponent>
      );
    case "blackBtn":
      return (
        <ButtonComponent
          onClick={onClick}
          {...props}
          sx={{
            backgroundColor: backBtnBackground,
            color: primaryLight,
            ...sx,
          }}
        >
          {children}
          {buttonLabel}
        </ButtonComponent>
      );
    case "errorBtn":
      return (
        <ButtonComponent
          {...props}
          onClick={onClick}
          sx={{
            backgroundColor: error,
            color: primaryLight,
            ...sx,
          }}
        >
          {children}
          {buttonLabel}
        </ButtonComponent>
      );
    case "cancelBtn":
      return (
        <ButtonComponent
          {...props}
          onClick={onClick}
          sx={{
            backgroundColor: lineGray,
            color: primaryDark,
            marginRight: "18px",
            ...sx,
          }}
        >
          {children}
          {buttonLabel}
        </ButtonComponent>
      );
    case "disableBtn":
      return (
        <ButtonComponent
          {...props}
          onClick={onClick}
          sx={{
            backgroundColor: disableColor,
            color: primaryDark,
            ...sx,
          }}
        >
          {children}
          {buttonLabel}
        </ButtonComponent>
      );
    default:
      return null;
  }
};

export const GridFooter = ({
  children,
  gridSize,
}: {
  children: ReactNode;
  gridSize?: string;
}) => {
  switch (gridSize) {
    case "small":
      return (
        <Grid
          sx={{
            width: "100%",
            paddingTop: "24px",
            height: "88px",
          }}
          container
          justifyContent="space-between"
        >
          {children}
        </Grid>
      );
    case "large":
      return (
        <Grid
          sx={{
            width: "100%",
            padding: "20px 24px",
            backgroundColor: primaryLight,
            boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
          }}
          container
          justifyContent="space-between"
        >
          {children}
        </Grid>
      );

    case "oneBtn":
      return (
        <Grid
          container
          justifyContent="flex-start"
          sx={{
            width: "100%",
            padding: "20px 24px",
            backgroundColor: primaryLight,
            position: "absolute",
            boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
            bottom: 0,
          }}
        >
          {children}
        </Grid>
      );
    case "modalBtns":
      return (
        <Grid
          container
          justifyContent="flex-end"
          sx={{
            width: "100%",
            paddingTop: "20px",
          }}
        >
          {children}
        </Grid>
      );
    case "formFooter": {
      return (
        <Grid
          container
          justifyContent="flex-end"
          sx={{
            width: "100%",
            padding: "20px 24px",
            backgroundColor: primaryLight,
            boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
          }}
        >
          {children}
        </Grid>
      );
    }
    default:
      return null;
  }
};

export const GridContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      item
      sx={{
        border: "0.5px solid",
        borderColor: lineGray,
        backgroundColor: primaryLight,
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      {children}
    </Grid>
  );
};

export const GridListContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      item
      sx={{
        border: "0.5px solid",
        borderColor: lineGray,
        backgroundColor: primaryLight,
        borderRadius: "12px",
        marginBottom: "24px",
      }}
    >
      {children}
    </Grid>
  );
};

export const GridFileContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      sx={{
        marginTop: "10px",
        background: primaryLight,
        border: "1.5px solid",
        borderColor: lineGray,
        borderRadius: "12px",
        padding: "14px 22px",
      }}
    >
      {children}
    </Grid>
  );
};

export const GridStatus = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      sx={{
        padding: "16px",
        border: "1px solid",
        borderColor: lineGray,
        borderRadius: "12px",
      }}
      item
      container
      justifyContent="space-between"
    >
      {children}
    </Grid>
  );
};

export const BreadCrumbContainer = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ padding: "24px" }}>{children}</Box>;
};

export const BreadCrumbIncludeBtn = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px",
      }}
    >
      {children}
    </Box>
  );
};

export const EnabledLabel = ({ enabledLabel }: { enabledLabel?: boolean }) => {
  switch (enabledLabel) {
    case false:
      return (
        <Chip
          sx={{
            backgroundColor: gray14,
            color: primaryGray,
          }}
          label="Inactive"
        />
      );
    case true:
      return (
        <Chip
          sx={{
            backgroundColor: green15,
            color: primaryGreen,
          }}
          label="Active"
        />
      );
    default:
      return null;
  }
};

export const Status = ({
  status,
  isChip = false,
}: {
  status: STATUS_LABEL;
  isChip?: boolean;
}) => {
  if (!status || !STATUS[status]) return null;

  const { labelText, color, backgroundColor } = STATUS[status];
  if (isChip) {
    return (
      <Chip
        sx={{
          backgroundColor,
          color,
        }}
        label={labelText}
      />
    );
  }

  return <Typography sx={{ color }}>{labelText}</Typography>;
};

export const StaticTypo = ({ children }: { children: ReactNode }) => {
  return (
    <Typography
      sx={{
        fontSize: "16px",
        color: primaryGray,
      }}
    >
      {children}
    </Typography>
  );
};

export const InfoTypo = ({ children }: { children: ReactNode }) => {
  return (
    <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }} sm={8}>
      <Typography
        sx={{
          fontWeight: "500",
          fontSize: "16px",
          color: primaryDark,
          marginRight: "15px",
        }}
      >
        {children}
      </Typography>
    </Grid>
  );
};

export const RoundedAvatar = ({
  children,
  width,
  height,
}: {
  children: ReactNode;
  width?: string;
  height?: string;
}) => {
  return (
    <Grid
      xs={12}
      sx={{
        width: width,
        height: height,
        borderRadius: "12px",
        border: "1px dashed",
        borderColor: lineGray,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Grid>
  );
};
