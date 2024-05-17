import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import MainCard from "../cards/MainCard";

import { useFormik } from "formik";

import { ButtonCustom, GridFooter } from "../CustomizeComponent";

import { ANNOUNCEMENT_URL } from "../../routes/Routes";

import useMutationCreateAnnouncement from "../../hooks/useMutationCreateAnnouncement";
import useMutationUpdateAnnouncement from "../../hooks/useMutationUpdateAnnouncement";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router";
import SuccessDialog from "../modal/SuccessDialog";
import {
  AnnouncementItemProps,
  ErrorInfo,
  STATUS_LABEL,
} from "../../types/types";
import useMutationPublishAnnouncement from "../../hooks/useMutationPublishAnnouncement";
import ConfirmModal from "../modal/ConfirmModal";

import UploadImage from "./UploadImage";
import { alertDuration } from "../../store/constant";
import { AxiosError } from "axios";
import ErrorDialog from "../modal/ErrorDialog";
import { lineGray } from "../../store/constant";

const ContentWrapper = ({
  children,
  title,
}: {
  children?: ReactNode;
  title: string;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="24px"
      p="24px"
      border="1px dashed"
      borderColor={lineGray}
      borderRadius="12px"
    >
      <Typography variant="h4">{title}</Typography>
      {children}
    </Box>
  );
};

const AnnouncementForm = ({
  announcement,
}: {
  announcement?: AnnouncementItemProps;
}) => {
  const { id } = announcement || {};

  const navigate = useNavigate();
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [success, setSuccess] = useState("");
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [publishModal, setPublishModal] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState(announcement?.imageUrl || "");
  const [khmerImageUrl, setKhmerImageUrl] = useState(
    announcement?.khmerImageUrl || ""
  );

  const { mutateAsync: create } = useMutationCreateAnnouncement();
  const { mutateAsync: update } = useMutationUpdateAnnouncement();
  const { mutateAsync: publish } = useMutationPublishAnnouncement();

  const formik = useFormik({
    enableReinitialize: true,
    isInitialValid: false,
    initialValues: {
      title: announcement?.title || "",
      khmerTitle: announcement?.khmerTitle || "",
      content: announcement?.content || "",
      khmerContent: announcement?.khmerContent || "",
      link: announcement?.link || undefined,
      imageUrl: announcement?.imageUrl || undefined,
      khmerImageUrl: announcement?.khmerImageUrl || undefined,
    },

    onSubmit: async (values) => {
      let variables = { ...values };
      if (imageUrl) {
        variables = { ...variables, imageUrl };
      }
      if (khmerImageUrl) {
        variables = { ...variables, khmerImageUrl };
      }
      try {
        if (id) {
          setUpdateModal(true);
        } else {
          await create(variables);
          handleSuccessDialog("Create Successfully!");
        }
      } catch (e) {
        const error = e as AxiosError<ErrorInfo>;
        setErrorMessage(error.response?.data.reason as string);
        handleErrorDialog();
      }
    },
  });

  const handleOnCancel = () => {
    setUpdateModal(false);
    setPublishModal(false);
  };

  const handleErrorDialog = () => {
    setOpenErrorDialog(!openErrorDialog);
    setTimeout(() => {
      setOpenErrorDialog(false);
    }, alertDuration);
  };

  const handleSuccessDialog = (message: string) => {
    setSuccess(message);
    setTimeout(() => {
      setSuccess("");
      navigate(ANNOUNCEMENT_URL);
    }, alertDuration);
  };

  const handleUpdate = async () => {
    setUpdateModal(false);
    if (!announcement) return;

    let variables = { ...formik.values };
    if (imageUrl || announcement.imageUrl) {
      const image = imageUrl || announcement.imageUrl;
      variables = { ...variables, imageUrl: image };
    }
    if (khmerImageUrl || announcement.khmerImageUrl) {
      const image = imageUrl || announcement.khmerImageUrl;
      variables = { ...variables, khmerImageUrl: image };
    }

    try {
      await update({ id: announcement.id, variables });
      handleSuccessDialog("Edit Successfully!");
    } catch (e) {
      const error = e as AxiosError<ErrorInfo>;
      setErrorMessage(error.response?.data.reason as string);
      handleErrorDialog();
    }
  };

  const handlePublish = async () => {
    setPublishModal(false);
    if (!announcement) return;
    try {
      await publish(announcement.id);
      handleSuccessDialog("Publish Successfully!");
    } catch (e) {
      const error = e as AxiosError<ErrorInfo>;
      setErrorMessage(error.response?.data.reason as string);
      handleErrorDialog();
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Container sx={{ marginBottom: "24px" }} maxWidth={false}>
          <Grid container spacing={3} width="100%">
            <Grid item xs={12} lg={8} xl={9} pb={3}>
              <MainCard
                title="Announcement Information"
                sx={{ paddingBottom: "24px" }}
                content={false}
              >
                <Box display="flex" flexDirection="column" gap="24px">
                  <ContentWrapper title="English Content">
                    <TextField
                      fullWidth
                      label="Title"
                      name="title"
                      required
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                    <TextField
                      fullWidth
                      label="Content"
                      name="content"
                      multiline
                      rows={5}
                      required
                      value={formik.values.content}
                      onChange={formik.handleChange}
                    />
                  </ContentWrapper>

                  <ContentWrapper title="Khmer Content">
                    <TextField
                      fullWidth
                      label="Title"
                      name="khmerTitle"
                      required
                      value={formik.values.khmerTitle}
                      onChange={formik.handleChange}
                    />
                    <TextField
                      fullWidth
                      label="Content"
                      name="khmerContent"
                      multiline
                      rows={5}
                      required
                      value={formik.values.khmerContent}
                      onChange={formik.handleChange}
                    />
                  </ContentWrapper>

                  <TextField
                    fullWidth
                    label="Link"
                    name="link"
                    value={formik.values.link || ""}
                    onChange={formik.handleChange}
                  />
                </Box>
              </MainCard>
            </Grid>

            <Grid item xs={12} lg={4} xl={3}>
              <UploadImage
                title="Banner for English"
                defaultPreview={imageUrl || announcement?.imageUrl}
                onUpload={(image) => setImageUrl(image)}
              />

              <UploadImage
                title="Banner for Khmer"
                defaultPreview={khmerImageUrl || announcement?.khmerImageUrl}
                onUpload={(image) => setKhmerImageUrl(image)}
              />
            </Grid>
          </Grid>
        </Container>
        <GridFooter
          gridSize={
            !!id && announcement?.status !== STATUS_LABEL.Published
              ? "large"
              : "formFooter"
          }
        >
          {announcement?.status === STATUS_LABEL.Draft && (
            <ButtonCustom
              variant="blackBtn"
              buttonLabel="Publish"
              onClick={() => setPublishModal(true)}
            />
          )}
          <div>
            <ButtonCustom
              href={ANNOUNCEMENT_URL}
              variant="cancelBtn"
              buttonLabel="Cancel"
            />
            <ButtonCustom
              type="submit"
              variant="orangeBtn"
              buttonLabel={id ? "Save" : "Create"}
              disabled={STATUS_LABEL.Published === announcement?.status}
            />
          </div>
        </GridFooter>
      </Box>
      <SuccessDialog open={!!success} message={success} />
      <ConfirmModal
        handleOnCancel={handleOnCancel}
        handleOnConfirm={handleUpdate}
        open={updateModal}
        description="Are you sure you want to update this record?"
      />

      <ErrorDialog open={openErrorDialog} message={errorMessage} />

      <ConfirmModal
        handleOnCancel={handleOnCancel}
        handleOnConfirm={handlePublish}
        open={publishModal}
        description="Are you sure you want to publish this announcement?"
      />
    </form>
  );
};
export default AnnouncementForm;
