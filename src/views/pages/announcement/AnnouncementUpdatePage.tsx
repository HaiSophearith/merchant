import { Box } from "@mui/material";

import FiberManualRecord from "@mui/icons-material/FiberManualRecord";

import { BreadCrumbContainer } from "../../../ui-component/CustomizeComponent";
import navigation from "../../../menu-items/index";
import Breadcrumbs from "../../../ui-component/extended/Breadcrumbs";
import AnnouncementForm from "../../../ui-component/Announcements/AnnouncementForm";
import { useParams } from "react-router";
import useQueryAnnouncementDetail from "../../../hooks/useQueryAnnouncementDetail";

const AnnouncementWrapper = ({ id }: { id: string }) => {
  const { result } = useQueryAnnouncementDetail(id);
  return <AnnouncementForm announcement={result} />;
};

const AnnouncementUpdatePage = () => {
  const { announcementId } = useParams();

  if (!announcementId) return null;

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
      <AnnouncementWrapper id={announcementId as string} />
    </Box>
  );
};

export default AnnouncementUpdatePage;
