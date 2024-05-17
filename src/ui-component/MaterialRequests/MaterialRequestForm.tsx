import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import MainCard from "../cards/MainCard";

import { ButtonCustom, GridFooter } from "../CustomizeComponent";

import { MATERIAL_REQUEST_URL } from "../../routes/Routes";

import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import SuccessDialog from "../modal/SuccessDialog";

import ErrorDialog from "../modal/ErrorDialog";
import { alertDuration, gray14, primaryGray } from "../../store/constant";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useQueryShopsByBusiness from "../../hooks/useQueryShopsByBusiness";

import useQueryCountersByShop from "../../hooks/useQueryCountersByShop";
import useQueryBranches from "../../hooks/useQueryBranches";
import useQueryMaterialTypes from "../../hooks/useQueryMaterialType";
import {
  ErrorInfo,
  MaterialRequestVariables,
  MATERIAL_REQUEST_STATUS,
  MATERIAL_REQUEST_RECEIVING_METHOD,
} from "../../types/types";
import useMutationCreateMaterialRequest from "../../hooks/useMutationCreateMaterialRequest";
import { AxiosError } from "axios";

const All = {
  id: "all",
  name: "All",
};

export const RECEIVING_OPTIONS = [
  {
    displayLabel: "Pick up",
    label: "KB PRASAC Branch Pickup",
    id: MATERIAL_REQUEST_RECEIVING_METHOD.PICK_UP,
  },
  {
    displayLabel: "Delivery",
    label: "Delivery",
    id: MATERIAL_REQUEST_RECEIVING_METHOD.DELIVERY,
  },
];

const MaterialRequestForm = ({
  businessName,
  businessId,
}: {
  businessName: string;
  businessId: string;
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState("");

  const [shopId, setShopId] = useState<string>("");
  const [counterId, setCounterId] = useState<string>("");
  const [receiving, setReceiving] = useState<string>("");
  const [branchId, setBranchId] = useState<string>("");

  const { shopList } = useQueryShopsByBusiness({
    businessId,
    limit: 100,
    pageNumber: 0,
  });

  const { counterList } = useQueryCountersByShop(
    {
      shopId: shopId || undefined,
      limit: 100,
      pageNumber: 0,
    },
    !!shopId
  );

  const { branches } = useQueryBranches();
  const { materialTypes } = useQueryMaterialTypes();
  const { mutateAsync: add } = useMutationCreateMaterialRequest();

  if (!shopList) return null;

  const handleSelectedShop = (e: SelectChangeEvent) => {
    e.preventDefault();
    setShopId(e.target.value);
  };

  const handleSelectedCounter = (e: SelectChangeEvent) => {
    e.preventDefault();
    setCounterId(e.target.value);
  };

  const handleSelectedReceiving = (e: SelectChangeEvent) => {
    e.preventDefault();
    setReceiving(e.target.value);
  };

  const handleSelectedBranch = (e: SelectChangeEvent) => {
    e.preventDefault();
    setBranchId(e.target.value);
  };

  const handleSuccessDialog = (message: string) => {
    setSuccess(message);
    setTimeout(() => {
      setSuccess("");
      navigate(MATERIAL_REQUEST_URL);
    }, alertDuration);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const {
        shopId,
        counterId,
        receivingOption,
        deliveryAddress,
        pickupBranchId,
      } = e.currentTarget;

      const materialList = materialTypes.map((item) => ({
        requestAmount: e.currentTarget[item.id].value,
        materialTypeId: item.id,
      }));

      let counterIds = [counterId.value];
      if (counterId.value === All.id) {
        counterIds = counterList.map((item) => item.id);
      }

      let input: MaterialRequestVariables = {
        businessId,
        status: MATERIAL_REQUEST_STATUS.PENDING,
        shopId: shopId.value,
        counterIds,
        receivingOption: receivingOption.value,
        longitude: 0,
        latitude: 0,
        materialList,
      };

      if (
        receivingOption.value === MATERIAL_REQUEST_RECEIVING_METHOD.DELIVERY
      ) {
        input = { ...input, deliveryAddress: deliveryAddress.value };
      } else if (
        receivingOption.value === MATERIAL_REQUEST_RECEIVING_METHOD.PICK_UP
      ) {
        input = { ...input, pickupBranchId: pickupBranchId.value };
      }

      await add(input);
      handleSuccessDialog("Create Successfully!");
    } catch (err) {
      const error = err as AxiosError<ErrorInfo>;
      setError((error.response?.data.reason as string) || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Container sx={{ marginBottom: "24px" }} maxWidth={false}>
          <Grid container width="100%">
            <Grid item xs={12} pb={3}>
              <MainCard
                title="Business Information"
                sx={{ paddingBottom: "24px" }}
                content={false}
              >
                <Grid
                  item
                  md={9}
                  display="flex"
                  flexDirection="column"
                  gap="24px"
                >
                  <Box display="flex" alignItems="center" gap="24px">
                    <TextField
                      fullWidth
                      disabled
                      label="BusinessName"
                      name="businessesName"
                      defaultValue={businessName}
                    />
                  </Box>
                  <FormControl fullWidth>
                    <InputLabel required id="shop-id">
                      Shop ID & Shop Name
                    </InputLabel>
                    <Select
                      required
                      fullWidth
                      label="Shop ID & Shop Name"
                      IconComponent={KeyboardArrowDownIcon}
                      id="shopId"
                      name="shopId"
                      disabled={!businessName}
                      onChange={handleSelectedShop}
                      value={shopId}
                    >
                      {shopList.map((option) => {
                        return (
                          <MenuItem key={option.id} value={option.id}>
                            {option.no} {option.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="24px"
                    width="100%"
                  >
                    <FormControl fullWidth>
                      <InputLabel required id="counter-id">
                        Choose Counter
                      </InputLabel>
                      <Select
                        required
                        fullWidth
                        label="Choose Counter"
                        IconComponent={KeyboardArrowDownIcon}
                        id="counterId"
                        name="counterId"
                        disabled={!shopId}
                        onChange={handleSelectedCounter}
                        value={counterId}
                      >
                        {[All, ...counterList]?.map((option) => {
                          return (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel required id="receiving-option">
                        Choose Receiving Option
                      </InputLabel>
                      <Select
                        required
                        fullWidth
                        label="Choose Receiving Option"
                        IconComponent={KeyboardArrowDownIcon}
                        id="receivingOption"
                        name="receivingOption"
                        disabled={!shopId}
                        onChange={handleSelectedReceiving}
                        value={receiving}
                      >
                        {RECEIVING_OPTIONS.map((option) => {
                          return (
                            <MenuItem key={option.id} value={option.id}>
                              {option.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    {receiving ===
                      MATERIAL_REQUEST_RECEIVING_METHOD.PICK_UP && (
                      <FormControl fullWidth>
                        <InputLabel required id="receiving-option">
                          Choose KH PRASAK Branch
                        </InputLabel>
                        <Select
                          required={
                            receiving ===
                            MATERIAL_REQUEST_RECEIVING_METHOD.PICK_UP
                          }
                          fullWidth
                          label="Choose KH PRASAK Branch"
                          IconComponent={KeyboardArrowDownIcon}
                          id="pickupBranchId"
                          name="pickupBranchId"
                          onChange={handleSelectedBranch}
                          value={branchId}
                        >
                          {branches?.map((option) => {
                            return (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    )}
                    {receiving ===
                      MATERIAL_REQUEST_RECEIVING_METHOD.DELIVERY && (
                      <TextField
                        required={
                          receiving ===
                          MATERIAL_REQUEST_RECEIVING_METHOD.DELIVERY
                        }
                        fullWidth
                        label="Choose Delivery Location"
                        name="deliveryAddress"
                      />
                    )}
                  </Box>

                  <Box>
                    <Typography variant="h3">Materials</Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="24px"
                      p="16px"
                      mt="16px"
                      bgcolor={gray14}
                      color={primaryGray}
                    >
                      <Box flex={1}>
                        <Typography>Material Name</Typography>
                      </Box>
                      <Box flex={1}>
                        <Typography>Quantity</Typography>
                      </Box>
                    </Box>
                    {materialTypes.map((item) => {
                      return (
                        <Box
                          display="flex"
                          alignItems="center"
                          gap="24px"
                          p="16px 16px 0"
                          key={item.id}
                        >
                          <Box flex={1}>
                            <Typography>{item.name}</Typography>
                          </Box>
                          <Box flex={1}>
                            <TextField
                              fullWidth
                              type="number"
                              name={item.id}
                              defaultValue="0"
                              inputProps={{ min: 0 }}
                            />
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </Container>
        <GridFooter gridSize={"formFooter"}>
          <div>
            <ButtonCustom
              href={MATERIAL_REQUEST_URL}
              variant="cancelBtn"
              buttonLabel="Cancel"
            />
            <ButtonCustom
              type="submit"
              variant="orangeBtn"
              buttonLabel={"Create"}
            />
          </div>
        </GridFooter>
      </Box>
      <SuccessDialog open={!!success} message={success} />
      <ErrorDialog
        open={!!error}
        message={error}
        onClose={() => setError("")}
      />
    </form>
  );
};
export default MaterialRequestForm;
