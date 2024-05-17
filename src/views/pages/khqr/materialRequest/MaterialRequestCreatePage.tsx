import { Box } from "@mui/material";

import FiberManualRecord from "@mui/icons-material/FiberManualRecord";

import { BreadCrumbContainer } from "../../../../ui-component/CustomizeComponent";
import navigation from "../../../../menu-items/index";
import Breadcrumbs from "../../../../ui-component/extended/Breadcrumbs";
import MaterialRequestForm from "../../../../ui-component/MaterialRequests/MaterialRequestForm";
import { useLocation } from "react-router";

const MaterialRequestCreatePage = () => {
  const { state } = useLocation();

  if (!state.businessId && !state.businessName) return null;

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
      <MaterialRequestForm
        businessId={state.businessId}
        businessName={state.businessName}
      />
    </Box>
  );
};

export default MaterialRequestCreatePage;
