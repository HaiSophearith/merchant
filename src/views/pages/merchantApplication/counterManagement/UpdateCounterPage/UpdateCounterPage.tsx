import { Box } from "@mui/material";
import React from "react";
import { BreadCrumbContainer } from "../../../../../ui-component/CustomizeComponent";
import Breadcrumbs from "../../../../../ui-component/extended/Breadcrumbs";
import navigation from "../../../../../menu-items/index";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import CreateAndUpdateCounter from "../CreateAndUpdateCounter";
import { useParams } from "react-router-dom";

const UpdateCounterPage = () => {
  const { shopId, counterId } = useParams();
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
      <CreateAndUpdateCounter shopId={shopId!} counterId={counterId} />
    </Box>
  );
};

export default UpdateCounterPage;
