import Breadcrumbs from "../../../../../ui-component/extended/Breadcrumbs";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import navigation from "../../../../../menu-items/index";
import { useParams } from "react-router-dom";

import CreateUpdateShop from "../CreateUpdateShop";
import { BreadCrumbContainer } from "../../../../../ui-component/CustomizeComponent";

const CreateShopPage = () => {
  const { businessId } = useParams();
  return (
    <>
      <BreadCrumbContainer>
        <Breadcrumbs
          separator={FiberManualRecord}
          navigation={navigation}
          icon
          title
          rightAlign
        />
      </BreadCrumbContainer>
      <CreateUpdateShop businessId={businessId!} />
    </>
  );
};
export default CreateShopPage;
