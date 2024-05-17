import { Chip, Tab, Tabs, TabsProps } from "@mui/material";
import { orange14, orangeMain, tabUnderline } from "../../store/constant";
import TabPanel, { computeTabPanelProps } from "./TabPanel";
import { Link } from "react-router-dom";
import { ReactElement } from "react";

interface TabLabelProps {
  label: string;
  count?: string | number;
}

interface TabItemProps extends TabLabelProps {
  key: string | number;
  component?: ReactElement;
}

interface CustomTabsProps extends TabsProps {
  items?: TabItemProps[];
}

const TabLabel = ({ label, count }: TabLabelProps) => {
  return (
    <>
      {label}
      {count !== undefined && (
        <Chip
          size="small"
          sx={{
            marginLeft: "8px",
            borderRadius: "8px",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}
          label={count}
        />
      )}
    </>
  );
};

export default function TabsCustom({
  value,
  items = [],
  onChange,
}: CustomTabsProps) {
  return (
    <>
      <Tabs
        value={value}
        onChange={onChange}
        TabIndicatorProps={{
          style: {
            color: orangeMain,
            borderBottom: `2px solid ${orangeMain}`,
          },
        }}
        sx={{
          borderColor: tabUnderline,
          mb: 2,
          "& a": {
            fontWeight: "600",
            color: "grey.900",
            display: "flex",
            flexDirection: "row",
          },
          "& a.Mui-selected": {
            color: orangeMain,
            "& div": {
              backgroundColor: orange14,
              color: orangeMain,
            },
          },
        }}
      >
        {items.map(({ key, label, count }) => (
          <Tab
            to="#"
            key={key}
            component={Link}
            sx={{ padding: "16px" }}
            label={<TabLabel label={label} count={count} />}
            {...computeTabPanelProps(key)}
          />
        ))}
      </Tabs>
      {items.map(({ key, component }, index) => (
        <TabPanel key={key} value={value} index={index}>
          {component}
        </TabPanel>
      ))}
    </>
  );
}
