import { Avatar, Box, Typography } from "@mui/material";
import MainCard from "../cards/MainCard";
import { ButtonComponent } from "../CustomizeComponent";
import { lineGray, orangeMain, primaryDark } from "../../store/constant";
import DefaultIcon from "../DefaultIcon";
import { ChangeEvent } from "react";

const PhotoCard = ({
  previewPhoto,
  uploadPhoto,
  wContainer,
  hContainer,
  wAvatar,
  hAvatar,
  borderRadius,
  title,
}: {
  previewPhoto: string;
  wContainer?: string;
  hContainer?: string;
  wAvatar?: string;
  hAvatar?: string;
  borderRadius?: string;
  title?: string;
  uploadPhoto: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <MainCard title={title}>
      <Box p="0 24px">
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: borderRadius,
              border: "1px dashed #E8EBF1",
              height: hContainer,
              width: wContainer,
            }}
          >
            <Avatar
              sx={{
                width: wAvatar,
                height: hAvatar,
                borderRadius: borderRadius,
                backgroundColor: lineGray,
              }}
              src={previewPhoto}
            >
              {previewPhoto === "" && <DefaultIcon />}
            </Avatar>
          </Box>
        </Box>
        <Box
          pt="24px"
          pb="24px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography>
            Allowed *.jpeg, *.jpg, *.pngmax size of 3.1 MB
          </Typography>
        </Box>

        <ButtonComponent
          sx={{
            width: "100%",
            backgroundColor: orangeMain,
            color: primaryDark,
          }}
        >
          <label htmlFor="containedButtonFile">
            <input
              accept="image/*"
              style={{
                opacity: 0,
                position: "fixed",
                zIndex: 1,
                padding: 0.5,
                cursor: "pointer",
              }}
              id="containedButtonFile"
              multiple
              type="file"
              onChange={uploadPhoto}
            />
            Upload Photo
          </label>
        </ButtonComponent>
      </Box>
    </MainCard>
  );
};

export default PhotoCard;
