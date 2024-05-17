import { Box } from "@mui/material";

import FiberManualRecord from "@mui/icons-material/FiberManualRecord";

import { BreadCrumbContainer } from "../../../ui-component/CustomizeComponent";
import navigation from "../../../menu-items/index";
import Breadcrumbs from "../../../ui-component/extended/Breadcrumbs";
import AnnouncementForm from "../../../ui-component/Announcements/AnnouncementForm";

const AnnouncementCreatePage = () => {
  return (
    <Box>
      <BreadCrumbContainer>
        <Breadcrumbs
          separator={FiberManualRecord}
          navigation={navigation}
          icon
          title
          rightAlign
        />
      </BreadCrumbContainer>
      <AnnouncementForm />
    </Box>
  );
};

export default AnnouncementCreatePage;
