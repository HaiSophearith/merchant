import {
  Box,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { convertStringToDate } from "./AnnouncementList";
import { PREFIX_IMAGE_URL } from "../../config";
import { ButtonCustom } from "../CustomizeComponent";
import { AnnouncementItemProps } from "../../types/types";

const AnnouncementDetailModal = ({
  open,
  onClose,
  announcement,
}: {
  open: boolean;
  onClose: () => void;
  announcement: AnnouncementItemProps | null;
}) => {
  const { imageUrl } = announcement || {};

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>View Announcement</DialogTitle>
      {!!announcement && (
        <>
          <DialogContent>
            {imageUrl && (
              <CardMedia
                component="img"
                image={`${PREFIX_IMAGE_URL}${imageUrl}`}
                title="Product"
                sx={{ borderRadius: "12px", marginBottom: "16px" }}
              />
            )}

            <Typography variant="h3" sx={{ fontWeight: 600 }}>
              {announcement.title}
            </Typography>
            <Typography variant="subtitle2" mb={3} mt="1">
              {convertStringToDate(announcement.createdDate)}
            </Typography>
            <Typography variant="body1" paragraph>
              {announcement.content}
            </Typography>
            <Box display="flex" justifyContent={"flex-end"}>
              <ButtonCustom
                variant="cancelBtn"
                buttonLabel="Cancel"
                sx={{ margin: 0 }}
                onClick={onClose}
              />
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default AnnouncementDetailModal;
