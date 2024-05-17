import Breadcrumbs from "../../../ui-component/extended/Breadcrumbs";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import navigation from "../../../menu-items/index";
import CreateUpdateBranch from "./CreateUpdateBranch";
import { BreadCrumbContainer } from "../../../ui-component/CustomizeComponent";

const CreateBranchPage = () => {
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

      <CreateUpdateBranch />
    </>
  );
};
export default CreateBranchPage;
