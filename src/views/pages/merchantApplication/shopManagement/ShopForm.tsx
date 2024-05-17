import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  alertDuration,
  backgroundGray1,
  disableColor,
  gridSpacing,
  orangeMain,
  primaryLight,
} from "../../../../store/constant";
import {
  ButtonCustom,
  GridFooter,
} from "../../../../ui-component/CustomizeComponent";
import useQueryCommunces from "../../../../hooks/useQueryCommunces";
import useQueryVillages from "../../../../hooks/useQueryVillages";
import useQueryDistricts from "../../../../hooks/useQueryDistricts";
import useQueryAllProvinces from "../../../../hooks/useQueryAllProvinces";
import {
  BankAccountNumberProps,
  BusinessDetailProps,
  ErrorInfo,
  RequestShopProps,
  STATUS_LABEL,
  ShopProps,
  ShopType,
} from "../../../../types/types";
import * as yup from "yup";
import { useFormik } from "formik";
import PersonIcon from "@mui/icons-material/Person";
import { useParams } from "react-router-dom";
import useMutationUploadPhoto from "../../../../hooks/useMutationUploadPhoto";
import { PREFIX_IMAGE_URL } from "../../../../config";
import PhotoCard from "../../../../ui-component/form/PhotoCard";
import MainCard from "../../../../ui-component/cards/MainCard";
import ConfirmModal from "../../../../ui-component/modal/ConfirmModal";
import useMutationEnableShop from "../../../../hooks/useMutationEnableShop";
import useMutationDisableShop from "../../../../hooks/useMutationDisableShop";
import ErrorDialog from "../../../../ui-component/modal/ErrorDialog";
import { AxiosError } from "axios";
import { VIEW_SHOP } from "../../../../routes/Routes";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(5)
    .max(25)
    .required("Must have from 5 to 25 character"),
});

interface CreateShopProps {
  onSubmit: (shop: RequestShopProps) => void;
  initialShop?: ShopProps;
  business?: BusinessDetailProps;
  shopTypes?: ShopType[];
  bankAccounts?: BankAccountNumberProps[];
}

const ShopForm = ({
  initialShop,
  business,
  shopTypes,
  bankAccounts,
  onSubmit,
}: CreateShopProps) => {
  const { mutateAsync: uploadPhoto } = useMutationUploadPhoto();
  const { businessId, shopId } = useParams();
  const [openEnableDisable, setOpenEnableDisable] = useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { mutateAsync: enableShop } = useMutationEnableShop();
  const { mutateAsync: disableShop } = useMutationDisableShop();

  const handleOpenEnableAndDisable = () => {
    setOpenEnableDisable(!openEnableDisable);
  };

  const handleCancelEnableDisable = () => {
    setOpenEnableDisable(false);
  };

  const handleErrorDialog = () => {
    setOpenErrorDialog(!openErrorDialog);
    setTimeout(() => {
      setOpenErrorDialog(false);
    }, alertDuration);
  };

  const handleConfirmEnableDisable = async () => {
    try {
      if (!!businessId && !!shopId && initialShop?.enabled) {
        await disableShop({
          businessId,
          shopId,
        });
        handleCancelEnableDisable();
      } else if (!!businessId && !!shopId && !initialShop?.enabled) {
        await enableShop({
          businessId,
          shopId,
        });
        handleCancelEnableDisable();
      }
    } catch (e) {
      const error = e as AxiosError<ErrorInfo>;
      setErrorMessage(error.response?.data.reason as string);
      handleErrorDialog();
    }
  };

  const [previewPhoto, setPreviewPhoto] = useState<string>(
    (initialShop?.profileImageUrl &&
      `${PREFIX_IMAGE_URL}${initialShop.profileImageUrl}`) ||
      ""
  );
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [enabledTip, setEnabledTip] = useState<boolean>(
    initialShop?.enabledTip || true
  );

  const [provinceId, setProvinceId] = useState<string>(
    initialShop?.province?.id || ""
  );
  const [districtId, setDistrictId] = useState<string>(
    initialShop?.district?.id || ""
  );
  const [communeId, setCommuneId] = useState<string>(
    initialShop?.commune?.id || ""
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [villageId, setVillageId] = useState<string>(
    initialShop?.village?.id || ""
  );

  const [bankAccountUSD, setBankAccountUSD] = useState<string>(
    initialShop?.bankAccounts?.find(
      (bankAccount: { currency: string }) => bankAccount.currency === "USD"
    )?.bankAccountNumber || ""
  );

  const [bankAccountKHR, setBankAccountKHR] = useState<string>(
    initialShop?.bankAccounts?.find(
      (bankAccount: { currency: string }) => bankAccount.currency === "KHR"
    )?.bankAccountNumber || ""
  );

  const handleChangeAccountUSD = (e: SelectChangeEvent) => {
    const { value } = e.target;
    setBankAccountUSD(value);
  };

  const handleChangeAccountKHR = (e: SelectChangeEvent) => {
    const { value } = e.target;
    setBankAccountKHR(value);
  };

  const { provinces } = useQueryAllProvinces();
  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setPreviewPhoto(URL.createObjectURL(selectedFiles[0]));
    if (selectedFiles[0]) {
      uploadPhoto(selectedFiles[0]).then((res) => {
        setProfileImageUrl(res);
      });
    }
  };

  const handleOnProvinceId = (e: SelectChangeEvent) => {
    const { value } = e.target;
    setProvinceId(value);
    setDistrictId("");
    setCommuneId("");
    setVillageId("");
  };

  const handleOnDistrictId = useCallback(
    (e: SelectChangeEvent) => {
      const { value } = e.target;
      setDistrictId(value);
      setCommuneId("");
      setVillageId("");
    },
    [setDistrictId]
  );

  const handleOnCommuneId = useCallback(
    (e: SelectChangeEvent) => {
      const { value } = e.target;
      setCommuneId(value);
      setVillageId("");
    },
    [setCommuneId]
  );

  const { districts } = useQueryDistricts(provinceId);

  const { communes } = useQueryCommunces({
    districtId: districtId,
  });

  const { villages } = useQueryVillages(communeId);

  const bankAccountHolderUSD = useMemo(() => {
    return bankAccounts?.find(
      (bankAccount) => bankAccount.bankAccountNumber === bankAccountUSD
    )?.bankAccountHolderName;
  }, [bankAccountUSD, bankAccounts]);

  const bankAccountHolderKHR = useMemo(() => {
    return bankAccounts?.find(
      (bankAccount) => bankAccount.bankAccountNumber === bankAccountUSD
    )?.bankAccountHolderName;
  }, [bankAccountUSD, bankAccounts]);

  const formik = useFormik({
    enableReinitialize: true,
    isInitialValid: false,
    initialValues: {
      id: initialShop?.id,
      name: initialShop?.name,
      phoneNumber: initialShop?.phoneNumber || "",
      enabledTip: initialShop?.enabledTip,
      telegramBot: initialShop?.telegramBot || "",
      longitude: initialShop?.longitude,
      latitude: initialShop?.latitude,
      addressLine1: initialShop?.addressLine1 || "",
      shopTypeId: initialShop?.type?.id,
      bankAccountNumbers: initialShop?.bankAccounts,
      enabled: initialShop?.enabled,
      status: STATUS_LABEL.Verified,
      villageId: initialShop?.village?.id,
    },

    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        name: values.name!,
        addressLine1: values.addressLine1,
        profileImageUrl: profileImageUrl,
        enabledTip: values.enabledTip!,
        enabled: values.enabled,
        latitude: values.latitude,
        longitude: values.longitude,
        telegramBot: values.telegramBot,
        phoneNumber: values.phoneNumber,
        shopTypeId: values.shopTypeId,
        villageId: values.villageId,
        status: values.status,
        bankAccountNumbers: [bankAccountUSD, bankAccountKHR],
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
        marginBottom="24px"
      >
        <Grid item sm={6} md={9}>
          <Grid
            sx={{
              border: "0.5px solid",
              borderColor: backgroundGray1,
              backgroundColor: primaryLight,
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <Typography
              sx={{ fontWeight: "bold", padding: "0 0 24px 0" }}
              variant="h2"
            >
              Shop Information
            </Typography>
            <Grid container spacing={gridSpacing}>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  name="name"
                  id="name"
                  label="Shop Name"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {business?.name}
                      </InputAdornment>
                    ),
                  }}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText="Must have from 5 to 25 character"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel required id="demo-simple-select-label">
                    Shop Type
                  </InputLabel>
                  <Select
                    required
                    sx={{ borderRadius: "12px" }}
                    fullWidth
                    label="Shop Type"
                    IconComponent={KeyboardArrowDownIcon}
                    defaultValue={initialShop?.type?.name}
                    id="shopTypeId"
                    name="shopTypeId"
                    value={formik.values.shopTypeId}
                    onChange={formik.handleChange}
                  >
                    {shopTypes?.map((option, index) => {
                      return (
                        <MenuItem key={index} value={option.id}>
                          {option.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  name="phoneNumber"
                  id="phoneNumber"
                  fullWidth
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  label="Shop Phone Number"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  id="telegramBot"
                  name="telegramBot"
                  label="Telegram Link ID"
                  value={formik.values.telegramBot}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <Typography variant="h4">
                  Settlement Accounts (At lease one required)
                </Typography>
              </Grid>

              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Account as USD
                  </InputLabel>
                  <Select
                    startAdornment={
                      bankAccountUSD !== "" && (
                        <InputAdornment position="start">
                          Saving Account |
                        </InputAdornment>
                      )
                    }
                    sx={{ borderRadius: "12px" }}
                    fullWidth
                    label="Account as USD"
                    id="currencyUSD"
                    name="currencyUSD"
                    IconComponent={KeyboardArrowDownIcon}
                    onChange={handleChangeAccountUSD}
                    value={bankAccountUSD}
                  >
                    {bankAccounts
                      ?.filter((bankAccount) => bankAccount.currency === "USD")
                      .map((account, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={account.bankAccountNumber}
                          >
                            {account.bankAccountNumber}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  {bankAccountUSD !== "" && (
                    <Box
                      display="flex"
                      alignItems="flex-end"
                      gap="4px"
                      mt="5px"
                    >
                      <PersonIcon
                        sx={{
                          color: disableColor,
                          width: "20px",
                          height: "20px",
                        }}
                      />
                      <Box display="flex" fontSize="12px">
                        <Typography>Account Name: </Typography>
                        <Typography ml="5px" color={orangeMain}>
                          {bankAccountHolderUSD}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </FormControl>
              </Grid>

              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Account as KHR
                  </InputLabel>
                  <Select
                    startAdornment={
                      bankAccountKHR !== "" && (
                        <InputAdornment position="start">
                          Saving Account |
                        </InputAdornment>
                      )
                    }
                    sx={{ borderRadius: "12px" }}
                    fullWidth
                    label="Account as KHR"
                    IconComponent={KeyboardArrowDownIcon}
                    id="currencyKHR"
                    name="currencyKHR"
                    onChange={handleChangeAccountKHR}
                    value={bankAccountKHR}
                  >
                    {bankAccounts
                      ?.filter((bankAccount) => bankAccount.currency === "KHR")
                      .map((account, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={account.bankAccountNumber}
                          >
                            {account.bankAccountNumber}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  {bankAccountKHR !== "" && (
                    <Box
                      display="flex"
                      alignItems="flex-end"
                      gap="4px"
                      mt="5px"
                    >
                      <PersonIcon
                        sx={{
                          color: disableColor,
                          width: "20px",
                          height: "20px",
                        }}
                      />
                      <Box display="flex" fontSize="12px">
                        <Typography>Account Name: </Typography>
                        <Typography ml="5px" color={orangeMain}>
                          {bankAccountHolderKHR}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </FormControl>
              </Grid>

              <Grid item md={12} xs={12}>
                <Typography variant="h2">Address Information</Typography>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  id="addressLine1"
                  name="addressLine1"
                  fullWidth
                  value={formik.values.addressLine1}
                  onChange={formik.handleChange}
                  label="House Number, Street no."
                />
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
                    onChange={handleOnProvinceId}
                    value={provinceId}
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

              <Grid item md={6} xs={12}>
                <FormControl disabled={districts?.length === 0} fullWidth>
                  <InputLabel required id="demo-simple-select-label">
                    Khan
                  </InputLabel>
                  <Select
                    required
                    sx={{ borderRadius: "12px" }}
                    fullWidth
                    label="Khan"
                    IconComponent={KeyboardArrowDownIcon}
                    onChange={handleOnDistrictId}
                    value={districtId}
                    id="districtId"
                    name="districtId"
                  >
                    {districts?.map((option) => {
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
                <FormControl disabled={communes?.length === 0} fullWidth>
                  <InputLabel required id="demo-simple-select-label">
                    Sangkat
                  </InputLabel>
                  <Select
                    required
                    sx={{ borderRadius: "12px" }}
                    fullWidth
                    label="Snagkat"
                    IconComponent={KeyboardArrowDownIcon}
                    value={communeId}
                    onChange={handleOnCommuneId}
                    id="communeId"
                    name="communceId"
                  >
                    {communes?.map((option) => {
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
                <FormControl disabled={communes?.length === 0} fullWidth>
                  <InputLabel required id="demo-simple-select-label">
                    Phumi/Village
                  </InputLabel>
                  <Select
                    required
                    name="villageId"
                    id="villageId"
                    sx={{ borderRadius: "12px" }}
                    fullWidth
                    label="Phumi/Village"
                    onChange={formik.handleChange}
                    value={formik.values.villageId}
                    IconComponent={KeyboardArrowDownIcon}
                  >
                    {villages?.map((option) => {
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
                <Typography variant="h4">Address Location</Typography>
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  type="number"
                  value={formik.values.longitude}
                  onChange={formik.handleChange}
                  fullWidth
                  label="Longitude"
                  name="longitude"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  type="number"
                  value={formik.values.latitude}
                  onChange={formik.handleChange}
                  fullWidth
                  label="Latitude"
                  name="latitude"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={7} md={3}>
          <PhotoCard
            title="Shop Photo"
            borderRadius="100%"
            hAvatar="155px"
            wAvatar="155px"
            hContainer="175px"
            wContainer="175px"
            previewPhoto={previewPhoto}
            uploadPhoto={uploadFile}
          />
          <Box sx={{ paddingTop: "24px" }}>
            <MainCard title="More Action">
              <FormControlLabel
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: 0,
                }}
                control={
                  <Switch
                    id="enabledTip"
                    name="enabledTip"
                    checked={enabledTip}
                    onChange={(e) => setEnabledTip(e.target.checked)}
                  />
                }
                label="Shop Tipping"
                labelPlacement="start"
              />
            </MainCard>
          </Box>
        </Grid>
      </Grid>

      <GridFooter gridSize={initialShop?.id ? "large" : "formFooter"}>
        {initialShop?.id && (
          <FormControlLabel
            control={
              <Switch
                sx={{ m: 1 }}
                checked={initialShop?.enabled}
                name="enabled"
                onChange={handleOpenEnableAndDisable}
              />
            }
            label={initialShop?.enabled ? "Active" : "Inactive"}
          />
        )}
        <div>
          <ButtonCustom
            variant="cancelBtn"
            buttonLabel="Cancel "
            onClick={() =>
              navigate(VIEW_SHOP.replace(":businessId", businessId as string))
            }
          />
          <ButtonCustom
            type="submit"
            variant="orangeBtn"
            buttonLabel={initialShop?.id ? "Save" : "Create"}
          />
        </div>
      </GridFooter>

      <ConfirmModal
        handleOnCancel={handleCancelEnableDisable}
        handleOnConfirm={handleConfirmEnableDisable}
        open={openEnableDisable}
        description={
          initialShop?.enabled
            ? "Are your sure you want to disable this shop?"
            : "Are your sure you want to enable this shop?"
        }
      />

      <ErrorDialog message={errorMessage} open={openErrorDialog} />
    </form>
  );
};
export default ShopForm;
