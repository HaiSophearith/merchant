import Breadcrumbs from "../../../ui-component/extended/Breadcrumbs";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import CreateUpdateBranch from "./CreateUpdateBranch";
import navigation from "../../../menu-items/index";
import { BreadCrumbContainer } from "../../../ui-component/CustomizeComponent";
import { useParams } from "react-router-dom";

const UpdateBranchPage = () => {
  const { branchId } = useParams();

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
      {branchId && <CreateUpdateBranch />}
    </>
  );
};
export default UpdateBranchPage;
