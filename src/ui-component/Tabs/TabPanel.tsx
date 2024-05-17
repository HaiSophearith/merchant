import { Box } from "@mui/material";
import { ReactElement } from "react";

export function computeTabPanelProps(index: number | string) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function computeTabCount(count?: number) {
  if (!count) return "0";
  if (count > 99) return "+99";
  return count;
}

interface TabPanelProps {
  index?: string | number;
  children?: ReactElement;
  value?: any;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </Box>
  );
}

export default TabPanel;
