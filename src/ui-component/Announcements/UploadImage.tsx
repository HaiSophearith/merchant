import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";

import { ButtonComponent } from "../CustomizeComponent";

import { ChangeEvent, useEffect, useState } from "react";

import {
  backgroundGray1,
  gray14,
  lineGray,
  orangeMain,
  primaryDark,
  primaryLight,
} from "../../store/constant";

import ErrorIcon from "@mui/icons-material/Error";
import DefaultIcon from "../DefaultIcon";

import { PREFIX_IMAGE_URL } from "../../config";
import useMutationUploadPhoto from "../../hooks/useMutationUploadPhoto";

const UploadImage = ({
  title,
  defaultPreview,
  onUpload,
}: {
  title: string;
  defaultPreview?: string;
  onUpload?: (image: string) => void;
}) => {
  const { mutateAsync: uploadPhoto } = useMutationUploadPhoto();

  const [preview, setPreview] = useState("");

  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;

    setPreview(URL.createObjectURL(selectedFiles[0]));
    if (selectedFiles[0]) {
      uploadPhoto(selectedFiles[0]).then((res) => {
        onUpload?.(res);
      });
    }
  };

  useEffect(() => {
    if (!defaultPreview) return;
    setPreview(`${PREFIX_IMAGE_URL}${defaultPreview}`);
  }, [defaultPreview]);

  return (
    <Grid
      minHeight="400px"
      border="1px solid"
      borderColor={backgroundGray1}
      bgcolor={primaryLight}
      borderRadius="12px"
      p={3}
      mb={3}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">{title}</Typography>
        <IconButton>
          <ErrorIcon />
        </IconButton>
      </Box>
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width="100%"
          mt={3}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            width="100%"
            maxWidth="292px"
            border="1px dashed"
            borderColor={gray14}
            borderRadius="12px"
            p="10px"
          >
            <Avatar
              sx={{
                width: "100%",
                height: "136px",
                borderRadius: "12px",
                backgroundColor: lineGray,
              }}
              variant="rounded"
              src={preview}
            >
              {!preview && <DefaultIcon />}
            </Avatar>
          </Box>

          <Box width="173px" my={3}>
            <Typography variant="subtitle1" display="flex" textAlign="center">
              Allowed *.jpeg, *.jpg, *.png max size of 3.1 MB
            </Typography>
          </Box>
        </Box>
      </Grid>
      <ButtonComponent
        sx={{
          width: "100%",
          backgroundColor: orangeMain,
          color: primaryDark,
          position: "relative",
        }}
      >
        <label htmlFor={title}>
          <input
            accept="image/*"
            style={{
              opacity: 0,
              zIndex: 1,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
            id={title}
            multiple
            type="file"
            onChange={uploadFile}
          />
          Upload Photo
        </label>
      </ButtonComponent>
    </Grid>
  );
};

export default UploadImage;
