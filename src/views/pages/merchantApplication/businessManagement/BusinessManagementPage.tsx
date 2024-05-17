import React, { useState } from "react";
import Breadcrumbs from "../../../../ui-component/extended/Breadcrumbs";
import AddIcon from "@mui/icons-material/Add";
import navigation from "../../../../menu-items/index";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AllBusinessTab from "./businessTabs/AllBusinessTab";
import VerifiedTab from "./businessTabs/VerifiedTab";
import UnverifiedTab from "./businessTabs/UnverifiedTab";
import EscalatedTab from "./businessTabs/EscalatedTab";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import {
  BreadCrumbIncludeBtn,
  ButtonCustom,
} from "../../../../ui-component/CustomizeComponent";
import MainCard from "../../../../ui-component/cards/MainCard";
import TabsCustom from "../../../../ui-component/Tabs/TabsCustom";
import { BUSINESS_CREATE_URL } from "../../../../routes/Routes";

const tabs = [
  { key: "all", label: "All", count: "+99", component: <AllBusinessTab /> },
  {
    key: "verified",
    label: "Verified",
    count: "+99",
    component: <VerifiedTab />,
  },
  {
    key: "unverified",
    label: "Unverified",
    count: "20",
    component: <UnverifiedTab />,
  },
  {
    key: "escalated",
    label: "Escalated",
    count: "7",
    component: <EscalatedTab />,
  },
];

const BusinessManagementPage = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState<number>(0);
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <>
      <BreadCrumbIncludeBtn>
        <Breadcrumbs
          separator={FiberManualRecord}
          navigation={navigation}
          icon
          title
          rightAlign
        />

        <ButtonCustom
          buttonLabel="Create Business"
          variant="orangeBtn"
          onClick={() => navigate(BUSINESS_CREATE_URL)}
        >
          <IconButton size="small">
            <AddIcon />
          </IconButton>
        </ButtonCustom>
      </BreadCrumbIncludeBtn>
      <Box sx={{ padding: "0 24px" }}>
        <MainCard>
          <TabsCustom value={value} items={tabs} onChange={handleChange} />
        </MainCard>
      </Box>
    </>
  );
};
export default BusinessManagementPage;
