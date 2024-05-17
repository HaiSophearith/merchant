import AnnouncementList from "../../../ui-component/Announcements/AnnouncementList";
import { Box, IconButton } from "@mui/material";

import FiberManualRecord from "@mui/icons-material/FiberManualRecord";

import AddIcon from "@mui/icons-material/Add";
import {
  BreadCrumbIncludeBtn,
  ButtonCustom,
} from "../../../ui-component/CustomizeComponent";
import navigation from "../../../menu-items/index";
import Breadcrumbs from "../../../ui-component/extended/Breadcrumbs";
import { useNavigate } from "react-router";
import { ANNOUNCEMENT_CREATE_URL } from "../../../routes/Routes";

const AnnouncementPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <BreadCrumbIncludeBtn>
        <Breadcrumbs
          separator={FiberManualRecord}
          navigation={navigation}
          icon
          title
          rightAlign
        />

        <ButtonCustom
          buttonLabel="Create Announcement"
          variant="orangeBtn"
          onClick={() => navigate(ANNOUNCEMENT_CREATE_URL)}
        >
          <IconButton size="small">
            <AddIcon />
          </IconButton>
        </ButtonCustom>
      </BreadCrumbIncludeBtn>
      <AnnouncementList />
    </Box>
  );
};
export default AnnouncementPage;
