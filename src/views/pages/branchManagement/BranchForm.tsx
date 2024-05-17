import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { alertDuration, gridSpacing } from "../../../store/constant";
import {
  ButtonCustom,
  GridFooter,
} from "../../../ui-component/CustomizeComponent";
import useQueryAllProvinces from "../../../hooks/useQueryAllProvinces";
import {
  BranchProps,
  ErrorInfo,
  RequestBranchProps,
} from "../../../types/types";
import * as yup from "yup";
import { useFormik } from "formik";
import useQueryRegionals from "../../../hooks/useQueryRegionals";
import MainCard from "../../../ui-component/cards/MainCard";
import { useNavigate, useParams } from "react-router";
import { BRANCH_URL } from "../../../routes/Routes";
import ConfirmModal from "../../../ui-component/modal/ConfirmModal";
import ErrorDialog from "../../../ui-component/modal/ErrorDialog";
import useMutationEnableBranch from "../../../hooks/useMutationEnableBranch";
import useMutationDisableBranch from "../../../hooks/useMutationDisableBranch";
import { AxiosError } from "axios";
import UploadImage from "../../../ui-component/Announcements/UploadImage";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(5)
    .max(25)
    .required("Must have from 5 to 25 character"),
  branchCode: yup
    .string()
    .min(1)
    .max(3)
    .required("Must have from 1 to 3 character"),
});

interface CreateBranchProps {
  onSubmit: (branch: RequestBranchProps) => void;
  initialBranch?: BranchProps;
}

const BranchForm = ({ initialBranch, onSubmit }: CreateBranchProps) => {
  const { branchId } = useParams();
  const { regionals } = useQueryRegionals();
  const [openEnableDisable, setOpenEnableDisable] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [branchPhoto, setBranchPhoto] = useState(initialBranch?.logoUrl || "");
  const { mutateAsync: enableBranch } = useMutationEnableBranch();
  const { mutateAsync: disableBranch } = useMutationDisableBranch();

  const handleErrorDialog = () => {
    setOpenErrorDialog(!openErrorDialog);
    setTimeout(() => {
      setOpenErrorDialog(false);
    }, alertDuration);
  };

  const handleOpenEnableDisable = () => {
    setOpenEnableDisable(!openEnableDisable);
  };

  const handleCancelEnableDisable = () => {
    setOpenEnableDisable(false);
  };

  const handleConfirmEnableDisable = async () => {
    try {
      if (!!branchId && initialBranch?.enabled) {
        await disableBranch(branchId);
        handleCancelEnableDisable();
      } else if (!!branchId && !initialBranch?.enabled) {
        await enableBranch(branchId);
        handleCancelEnableDisable();
      }
    } catch (e) {
      const error = e as AxiosError<ErrorInfo>;
      setErrorMessage(error.response?.data.reason as string);
      handleErrorDialog();
    }
  };

  const { provinces } = useQueryAllProvinces();

  const formik = useFormik({
    enableReinitialize: true,
    isInitialValid: false,
    initialValues: {
      id: initialBranch?.id,
      name: initialBranch?.name,
      branchCode: initialBranch?.branchCode,
      phoneNumber: initialBranch?.phoneNumber,
      khmerAddress: initialBranch?.khmerAddress,
      longitude: initialBranch?.longitude,
      latitude: initialBranch?.latitude,
      address: initialBranch?.address,
      enabled: initialBranch?.enabled,
      description: initialBranch?.description,
      email: initialBranch?.email,
      provinceId: initialBranch?.province.id!,
      regionalId: initialBranch?.regional.id!,
      branchPhoto: initialBranch?.logoUrl || undefined,
    },

    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        name: values.name || "",
        longitude: values.longitude || 0,
        latitude: values.latitude || 0,
        regionalId: values.regionalId!,
        provinceId: values.provinceId!,
        enabled: values.enabled,
        branchCode: values.branchCode!,
        description: values.description,
        khmerAddress: values.khmerAddress,
        address: values.address,
        phoneNumber: values.phoneNumber,
        email: values.email,
        logoUrl: branchPhoto,
        khmerName: "Khmer Name", // This field is a mock datalogoUrl
      });
    },
  });

  const navigate = useNavigate();

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        sx={{
          padding: "0 24px",
        }}
        container
        spacing={3}
      >
        <Grid item sm={6} md={9}>
          <MainCard title="Branch Information">
            <Grid container spacing={gridSpacing}>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  name="branchCode"
                  id="branchCode"
                  label="KB Branch Code"
                  fullWidth
                  value={formik.values.branchCode}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.branchCode &&
                    Boolean(formik.errors.branchCode)
                  }
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  name="name"
                  id="name"
                  label="KB Branch Name"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel required id="demo-simple-select-label">
                    Regional
                  </InputLabel>
                  <Select
                    required
                    sx={{ borderRadius: "12px" }}
                    fullWidth
                    label="Regional"
                    IconComponent={KeyboardArrowDownIcon}
                    onChange={formik.handleChange}
                    value={formik.values.regionalId}
                    id="regionalId"
                    name="regionalId"
                  >
                    {regionals?.map((option) => {
                      return (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel required id="demo-simple-select-label">
                    Province/City
                  </InputLabel>
                  <Select
                    required
                    sx={{ borderRadius: "12px" }}
                    fullWidth
                    label="Province/City"
                    IconComponent={KeyboardArrowDownIcon}
                    onChange={formik.handleChange}
                    value={formik.values.provinceId}
                    id="provinceId"
                    name="provinceId"
                  >
                    {provinces?.map((option) => {
                      return (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  id="address"
                  name="address"
                  fullWidth
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  label="Address"
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  id="khmerAddress"
                  name="khmerAddress"
                  fullWidth
                  value={formik.values.khmerAddress}
                  onChange={formik.handleChange}
                  label="Address In Khmer"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  required
                  type="number"
                  value={formik.values.longitude}
                  onChange={formik.handleChange}
                  fullWidth
                  label="Longitude"
                  name="longitude"
                  id="longitude"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  type="number"
                  value={formik.values.latitude}
                  onChange={formik.handleChange}
                  fullWidth
                  label="Latitude"
                  name="latitude"
                  id="latitude"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  id="phoneNumber"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  fullWidth
                  label="Email"
                  name="email"
                  id="email"
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  multiline
                  rows={3}
                  id="description"
                  name="description"
                  fullWidth
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  label="Description"
                />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>

        <Grid item sm={7} md={3}>
          <UploadImage
            defaultPreview={branchPhoto || initialBranch?.logoUrl}
            onUpload={(image) => setBranchPhoto(image)}
            title="Branch Photo"
          />
        </Grid>
      </Grid>

      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <GridFooter gridSize={initialBranch?.id ? "large" : "formFooter"}>
          {initialBranch?.id && (
            <FormControlLabel
              control={
                <Switch
                  sx={{ m: 1 }}
                  id="enabled"
                  name="enabled"
                  checked={initialBranch.enabled}
                  onClick={handleOpenEnableDisable}
                />
              }
              label="Inactive"
            />
          )}
          <div>
            <ButtonCustom
              onClick={() => navigate(BRANCH_URL)}
              variant="cancelBtn"
              buttonLabel="Cancel "
            />
            <ButtonCustom
              type="submit"
              variant="orangeBtn"
              buttonLabel={initialBranch?.id ? "Save" : "Create"}
            />
          </div>
        </GridFooter>

        <ConfirmModal
          handleOnCancel={handleCancelEnableDisable}
          handleOnConfirm={handleConfirmEnableDisable}
          open={openEnableDisable}
          description={
            initialBranch?.enabled
              ? "Are your sure you want to disable this branch?"
              : "Are your sure you want to enable this branch?"
          }
        />

        <ErrorDialog message={errorMessage} open={openErrorDialog} />
      </Box>
    </form>
  );
};
export default BranchForm;
