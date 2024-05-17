import React, { Ref } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardProps,
  CardHeaderProps,
  CardContentProps,
  Box,
} from "@mui/material";
import { primaryLight } from "../../store/constant";

export interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children: React.ReactNode | string;
  style?: React.CSSProperties;
  content?: boolean;
  className?: string;
  contentClass?: string;
  contentSX?: CardContentProps["sx"];
  darkTitle?: boolean;
  sx?: CardProps["sx"];
  secondary?: CardHeaderProps["action"];
  shadow?: string;
  elevation?: number;
  title?: React.ReactNode | string;
  renderIcon?: () => React.ReactNode;
}

const MainCard = React.forwardRef(
  (
    {
      border = false,
      boxShadow,
      children,
      content = true,
      contentClass = "",
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      renderIcon,
      ...others
    }: MainCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          bgcolor: primaryLight,
          borderRadius: "12px",
          border: "1px solid #E9EFF4",
          boxShadow: "0 2px 14px 0 rgb(32 40 45 / 8%)",
          padding: "24px 24px 0 24px",
          ...sx,
        }}
      >
        {/* card header and action */}
        {title && (
          <Box display="flex" justifyContent="space-between">
            <CardHeader
              sx={{ padding: 0 }}
              title={
                <Typography sx={{ paddingBottom: "24px" }} variant="h3">
                  {title}
                </Typography>
              }
              action={secondary}
            />

            <Box>{renderIcon?.()}</Box>
          </Box>
        )}

        {/* card content */}
        {content && (
          <CardContent sx={{ padding: 0 }} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
