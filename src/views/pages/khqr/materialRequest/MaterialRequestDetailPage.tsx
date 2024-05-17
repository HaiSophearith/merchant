import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import FiberManualRecord from "@mui/icons-material/FiberManualRecord";

import { BreadCrumbIncludeBtn } from "../../../../ui-component/CustomizeComponent";
import navigation from "../../../../menu-items/index";
import Breadcrumbs from "../../../../ui-component/extended/Breadcrumbs";
import MaterialRequestDetail from "../../../../ui-component/MaterialRequests/MaterialRequestDetail";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useParams } from "react-router";
import { primaryLight } from "../../../../store/constant";
import {
  ErrorInfo,
  MATERIAL_REQUEST_RECEIVING_METHOD,
  MATERIAL_REQUEST_STATUS,
} from "../../../../types/types";
import { red } from "@mui/material/colors";
import useQueryMaterialRequestDetail from "../../../../hooks/useQueryMaterialRequestDetail";
import useMutationUpdateMaterialRequest from "../../../../hooks/useMutationUpdateMaterialRequest";
import { useState } from "react";
import ErrorDialog from "../../../../ui-component/modal/ErrorDialog";
import { AxiosError } from "axios";
import SuccessDialog from "../../../../ui-component/modal/SuccessDialog";
import ConfirmModal from "../../../../ui-component/modal/ConfirmModal";

const deliveryStatusOptions: Record<string, string> = {
  [MATERIAL_REQUEST_STATUS.PENDING]: "New",
  [MATERIAL_REQUEST_STATUS.PROCESSING]: "Processing",
  [MATERIAL_REQUEST_STATUS.DELIVERING]: "Delivering",
  [MATERIAL_REQUEST_STATUS.DELIVERED]: "Delivered",
  [MATERIAL_REQUEST_STATUS.CANCELLED]: "Cancel Order",
};

const pickUpStatusOptions: Record<string, string> = {
  [MATERIAL_REQUEST_STATUS.PENDING]: "New",
  [MATERIAL_REQUEST_STATUS.PROCESSING]: "Processing",
  [MATERIAL_REQUEST_STATUS.PICK_UP]: "Ready to Pick up",
  [MATERIAL_REQUEST_STATUS.COMPLETED]: "Completed",
  [MATERIAL_REQUEST_STATUS.CANCELLED]: "Cancel Order",
};

const MaterialRequestDetailPage = () => {
  const { materialRequestId } = useParams();

  if (!materialRequestId) return null;
  return <MaterialRequestDetailWrapper id={materialRequestId} />;
};

const MaterialRequestDetailWrapper = ({ id }: { id: string }) => {
  const { requestDetail } = useQueryMaterialRequestDetail(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [showConfirmUpdate, setShowConfirmUpdate] = useState(false);

  const { mutateAsync: update } = useMutationUpdateMaterialRequest();

  if (!requestDetail) return null;

  const { receivingOption, shop, business, counters, status } = requestDetail;

  const handleStatusChange = (e: SelectChangeEvent) => {
    if (!e.target.value) return;
    setNewStatus(e.target.value);
    setShowConfirmUpdate(true);
  };

  const handleUpdateStatus = async () => {
    if (!newStatus) return;
    setLoading(true);

    try {
      const counterIds = counters.map((item) => item.id);
      const materialList = counters[0].materials.map((item) => ({
        requestAmount: item.amount,
        materialTypeId: item.id,
      }));
      const input = {
        businessId: business.id,
        status: newStatus as MATERIAL_REQUEST_STATUS,
        shopId: shop.id,
        counterIds,
        receivingOption: receivingOption,
        longitude: 0,
        latitude: 0,
        materialList,
      };
      await update({ id, variables: input });
      setSuccess("Edit Successfully!");
    } catch (err) {
      const error = err as AxiosError<ErrorInfo>;
      setError((error.response?.data.reason as string) || error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions =
    receivingOption === MATERIAL_REQUEST_RECEIVING_METHOD.DELIVERY
      ? deliveryStatusOptions
      : pickUpStatusOptions;

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

        <Select
          variant="outlined"
          IconComponent={KeyboardArrowDownIcon}
          id="status"
          name="status"
          sx={{ width: "250px", background: primaryLight }}
          defaultValue={status}
          onChange={handleStatusChange}
          disabled={loading}
          renderValue={(value) => {
            return (
              <Typography fontWeight="bold">{statusOptions[value]}</Typography>
            );
          }}
        >
          {Object.keys(statusOptions).map((option) => {
            if (option === MATERIAL_REQUEST_STATUS.PENDING) return null;
            if (option === MATERIAL_REQUEST_STATUS.CANCELLED) {
              return (
                <MenuItem key={option} value={option}>
                  <Box
                    bgcolor={red.A700}
                    color={primaryLight}
                    borderRadius="12px"
                    p="16px"
                    width="100%"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {statusOptions[option]}
                  </Box>
                </MenuItem>
              );
            }
            return (
              <MenuItem
                key={option}
                value={option}
                sx={{ padding: "16px", width: "100%", fontWeight: "bold" }}
              >
                {statusOptions[option]}
              </MenuItem>
            );
          })}
        </Select>
      </BreadCrumbIncludeBtn>
      <MaterialRequestDetail requestDetail={requestDetail} />
      <ConfirmModal
        open={showConfirmUpdate}
        description={`Are you sure you want to updated the request status ${statusOptions[status]} to ${statusOptions[newStatus]}?`}
        handleOnCancel={() => setShowConfirmUpdate(false)}
        handleOnConfirm={handleUpdateStatus}
      />
      <SuccessDialog open={!!success} message={success} />
      <ErrorDialog
        open={!!error}
        message={error}
        onClose={() => setError("")}
      />
    </Box>
  );
};

export default MaterialRequestDetailPage;
