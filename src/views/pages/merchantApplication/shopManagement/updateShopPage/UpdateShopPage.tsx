import React from "react";
import Breadcrumbs from "../../../../../ui-component/extended/Breadcrumbs";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import navigation from "../../../../../menu-items/index";
import { useParams } from "react-router-dom";
import CreateUpdateShop from "../CreateUpdateShop";
import { BreadCrumbContainer } from "../../../../../ui-component/CustomizeComponent";
import { Box } from "@mui/material";

const UpdateShopPage = () => {
  const { businessId, shopId } = useParams();

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
      <CreateUpdateShop businessId={businessId!} shopId={shopId} />
    </Box>
  );
};
export default UpdateShopPage;
