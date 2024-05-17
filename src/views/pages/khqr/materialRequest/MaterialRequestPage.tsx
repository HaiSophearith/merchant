import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import FiberManualRecord from "@mui/icons-material/FiberManualRecord";

import AddIcon from "@mui/icons-material/Add";
import {
  BreadCrumbIncludeBtn,
  ButtonCustom,
} from "../../../../ui-component/CustomizeComponent";
import navigation from "../../../../menu-items/index";
import Breadcrumbs from "../../../../ui-component/extended/Breadcrumbs";
import { useNavigate } from "react-router";
import { MATERIAL_REQUEST_CREATE_URL } from "../../../../routes/Routes";
import { FormEvent, useState } from "react";
import useQueryBusinessList from "../../../../hooks/useQueryBusinessList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MaterialRequestList from "../../../../ui-component/MaterialRequests/MaterialRequestList";

const MaterialRequestPage = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { businessList } = useQueryBusinessList({
    limit: 500, //Try to get all business will be update the query
    pageNumber: 0,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const businessId = e.currentTarget.businessId.value;
    const businessName = businessList.find(
      (item) => item.id === businessId
    )?.name;

    navigate(MATERIAL_REQUEST_CREATE_URL, {
      state: { businessId, businessName },
    });
  };

  const [businessId, setBusinessId] = useState("");

  const handleSelectedBusiness = (e: SelectChangeEvent) => {
    e.preventDefault();
    setBusinessId(e.target.value);
  };

  return (
    <Box>
      <BreadCrumbIncludeBtn>
        <Breadcrumbs
          separator={FiberManualRecord}
          navigation={navigation}
          icon
          title
          rightAlign
        />

        <ButtonCustom
          buttonLabel="Create Request"
          variant="orangeBtn"
          onClick={() => setOpen(true)}
        >
          <IconButton size="small">
            <AddIcon />
          </IconButton>
        </ButtonCustom>
      </BreadCrumbIncludeBtn>

      <MaterialRequestList />

      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Business</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box pt={3}>
              <FormControl fullWidth>
                <InputLabel required id="counter-id">
                  Business ID & Business name
                </InputLabel>
                <Select
                  required
                  fullWidth
                  label="Business ID & Business name"
                  IconComponent={KeyboardArrowDownIcon}
                  id="businessId"
                  name="businessId"
                  onChange={handleSelectedBusiness}
                  value={businessId}
                >
                  {businessList?.map((option) => {
                    return (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ padding: "24px" }}>
            <ButtonCustom
              onClick={() => setOpen(false)}
              variant="cancelBtn"
              buttonLabel="Cancel"
            />
            <ButtonCustom
              type="submit"
              variant="blackBtn"
              buttonLabel="Continue"
            />
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
export default MaterialRequestPage;
