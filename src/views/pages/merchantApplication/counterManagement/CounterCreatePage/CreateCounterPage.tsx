import React from "react";
import Breadcrumbs from "../../../../../ui-component/extended/Breadcrumbs";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import navigation from "../../../../../menu-items/index";
import { BreadCrumbContainer } from "../../../../../ui-component/CustomizeComponent";
import { Box } from "@mui/material";
import CreateAndUpdateCounter from "../CreateAndUpdateCounter";
import { useParams } from "react-router-dom";

const CreateCounterPage = () => {
  const { shopId } = useParams();
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
      <CreateAndUpdateCounter shopId={shopId!} />
    </Box>
  );
};

export default CreateCounterPage;
