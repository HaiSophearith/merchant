import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  Typography,
} from "@mui/material";
import {
  gridSpacing,
  orangeMain,
  primaryLight,
} from "../../../../../store/constant";
import { Box } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useQueryBusinessCategories from "../../../../../hooks/useQueryBusinessCategories";
import { ChangeEvent, useEffect, useMemo, useRef } from "react";
import { ShopTypes } from "../../../../../types/types";
import useQueryProvinces from "../../../../../hooks/useQueryProvinces";
import useQueryDistricts from "../../../../../hooks/useQueryDistricts";
import useQueryCommunes from "../../../../../hooks/useQueryCommunes";
import useQueryVillages from "../../../../../hooks/useQueryVillages";
import InputField from "../../../../../ui-component/formField/InputField";
import {
  Field,
  FieldProps,
  FormikValues,
  getIn,
  useFormikContext,
} from "formik";
import useQueryBankAccounts from "../../../../../hooks/useQueryBankAccounts";
import MainCard from "../../../../../ui-component/cards/MainCard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FormControlLabel from "@mui/material/FormControlLabel";
import { LightTooltip } from "../../businessManagement/businessCreatePage/BusinessForm";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { PREFIX_IMAGE_URL } from "../../../../../config";
import useMutationFileUpload from "../../../../../hooks/useMutationFileUpload";

const ShopCreateForm = () => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const { errors, values, setFieldValue } = useFormikContext<FormikValues>();
  const { businessCategoies } = useQueryBusinessCategories();
  const { provinces } = useQueryProvinces();
  const { districts, refetch: refetchDistricts } = useQueryDistricts(
    values.address.province
  );
  const { communes, refetch: refetchCommunues } = useQueryCommunes(
    values.address.district
  );
  const { villages, refetch: refetchVillages } = useQueryVillages(
    values.address.communue
  );

  const { bankAccounts } = useQueryBankAccounts({
    cif: values.cif,
    phoneNumber: `+855${values.businessPhoneNumber}`,
  });

  const {
    mutate: fileUpload,
    data: logoUrl,
    status: fileUploadStatus,
  } = useMutationFileUpload();

  useEffect(() => {
    if (fileUploadStatus === "success") {
      setFieldValue("profileImageUrl", logoUrl);
    }
  }, [fileUploadStatus, logoUrl, setFieldValue]);

  useEffect(() => {
    if (values.address.province) {
      refetchDistricts();
    }
    if (values.address.district) {
      refetchCommunues();
    }
    if (values.address.communue) {
      refetchVillages();
    }
  }, [values.address, refetchDistricts, refetchCommunues, refetchVillages]);

  const shopTypeList = useMemo(() => {
    const options = Object.values(businessCategoies).find((item) => {
      return item.id === values.businessCategory;
    })?.shopTypes;
    return options || [];
  }, [values.businessCategory, businessCategoies]);

  const handleLogoUpload = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    if (!fileUploaded) return;
    fileUpload({ file: fileUploaded });
  };

  const handleProvinceChange = (event: SelectChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value;
    setFieldValue("address.province", selected);
    setFieldValue("address.district", undefined);
    setFieldValue("address.communue", undefined);
    setFieldValue("address.village", undefined);
  };

  const handleDistrictChange = (event: SelectChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value;
    setFieldValue("address.district", selected);
    setFieldValue("address.communue", undefined);
    setFieldValue("address.village", undefined);
  };

  const handleCommunueChange = (event: SelectChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value;
    setFieldValue("address.communue", selected);
    setFieldValue("address.village", undefined);
  };

  return (
    <Grid sx={{ padding: "24px" }} container spacing={3} pt={3}>
      <Grid item container xs={9}>
        <MainCard title="Shop Information">
          <Grid container spacing={gridSpacing}>
            <Grid item container xs={6}>
              <InputField
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      {values.businessName}
                    </InputAdornment>
                  ),
                }}
                fullWidth
                label="Shop Name"
                name="shopName"
                value={values.shopName}
                required
                error={!!errors.shopName}
                helperText={errors.shopName}
              />
            </Grid>
            <Grid item container xs={6}>
              <Field name="shopType">
                {({ field, form }: FieldProps) => (
                  <FormControl fullWidth error={form.errors.type !== undefined}>
                    <InputLabel required>Shop Type</InputLabel>
                    <Select
                      {...field}
                      sx={{ borderRadius: "12px" }}
                      id="shop-type"
                      label={"Shop Type"}
                      IconComponent={KeyboardArrowDownIcon}
                      error={!!form.errors.shopType}
                      value={field.value || ""}
                    >
                      {shopTypeList.map((option: ShopTypes) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {form.errors.shopType && (
                      <FormHelperText sx={{ color: "red" }}>
                        {form.errors.type as string}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              </Field>
            </Grid>

            <Grid item md={6} xs={12}>
              <InputField
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
                fullWidth
                label="Shop Phone Number"
                name="phoneNumber"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputField
                label="Telegram Link ID"
                fullWidth
                name="telegramBot"
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <Typography variant="h4">
                Settlement Accounts (At lease one required)
              </Typography>
            </Grid>

            <Grid item md={6} xs={12}>
              <Field name="bankAccountUSD">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    fullWidth
                    error={form.errors.bankAccountUSD !== undefined}
                  >
                    <InputLabel
                      required={!values.bankAccountKHR && !field.value}
                    >
                      Account as USD
                    </InputLabel>
                    <Select
                      {...field}
                      sx={{ borderRadius: "12px" }}
                      id="account-usd"
                      label={"Account as USD"}
                      IconComponent={KeyboardArrowDownIcon}
                      value={field.value || undefined}
                    >
                      {bankAccounts?.map((option) => (
                        <MenuItem
                          key={option.bankAccountNumber}
                          value={option.bankAccountNumber}
                          disabled={
                            values.bankAccountKHR &&
                            option.bankAccountNumber === values.bankAccountKHR
                          }
                        >
                          {option.bankAccountNumber}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
            </Grid>
            <Grid item md={6} xs={12}>
              <Field name="bankAccountKHR">
                {({ field, form }: FieldProps) => (
                  <FormControl fullWidth>
                    <InputLabel
                      required={!values.bankAccountUSD && !field.value}
                    >
                      Account as KHQ
                    </InputLabel>
                    <Select
                      {...field}
                      sx={{ borderRadius: "12px" }}
                      id="account-khr"
                      label={"Account as KHR"}
                      IconComponent={KeyboardArrowDownIcon}
                      value={field.value || undefined}
                    >
                      {bankAccounts?.map((option) => (
                        <MenuItem
                          key={option.bankAccountNumber}
                          value={option.bankAccountNumber}
                          disabled={
                            values.bankAccountUSD &&
                            option.bankAccountNumber === values.bankAccountUSD
                          }
                        >
                          {option.bankAccountNumber}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h3">Address Information</Typography>
            </Grid>
            <Grid item xs={12}>
              <InputField
                label="House Number, Street no."
                fullWidth
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
                name="addressLine1"
                error={!!errors.addressLine1}
                helperText={errors.addressLine1}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Field name="address.province">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    fullWidth
                    error={getIn(form.errors, field.name) !== undefined}
                  >
                    <InputLabel required>Province</InputLabel>
                    <Select
                      {...field}
                      sx={{ borderRadius: "12px" }}
                      id="province"
                      label={"Province"}
                      IconComponent={KeyboardArrowDownIcon}
                      error={getIn(form.errors, field.name)}
                      value={field.value || ""}
                      onChange={handleProvinceChange}
                    >
                      {provinces?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ color: "red" }}>
                      {getIn(form.errors, field.name)}
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
            </Grid>

            <Grid item md={6} xs={12}>
              <Field name="address.district">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    fullWidth
                    error={getIn(form.errors, field.name) !== undefined}
                  >
                    <InputLabel required>District</InputLabel>
                    <Select
                      {...field}
                      sx={{ borderRadius: "12px" }}
                      id="district"
                      label={"District"}
                      IconComponent={KeyboardArrowDownIcon}
                      disabled={!values.address.province}
                      error={getIn(form.errors, field.name)}
                      value={field.value || ""}
                      onChange={handleDistrictChange}
                    >
                      {districts?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {values.address.province && (
                      <FormHelperText sx={{ color: "red" }}>
                        {getIn(form.errors, field.name)}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              </Field>
            </Grid>
            <Grid item md={6} xs={12}>
              <Field name="address.communue">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    fullWidth
                    error={getIn(form.errors, field.name) !== undefined}
                  >
                    <InputLabel required>Commune</InputLabel>
                    <Select
                      {...field}
                      sx={{ borderRadius: "12px" }}
                      id="commune"
                      label={"Commune"}
                      IconComponent={KeyboardArrowDownIcon}
                      disabled={!values.address.district}
                      value={field.value || ""}
                      onChange={handleCommunueChange}
                    >
                      {communes?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {values.address.district && (
                      <FormHelperText sx={{ color: "red" }}>
                        {getIn(form.errors, field.name)}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              </Field>
            </Grid>
            <Grid item md={6} xs={12}>
              <Field name="address.village">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    fullWidth
                    error={getIn(form.errors, field.name) !== undefined}
                  >
                    <InputLabel required>Village</InputLabel>
                    <Select
                      {...field}
                      sx={{ borderRadius: "12px" }}
                      id="village"
                      label={"Village"}
                      IconComponent={KeyboardArrowDownIcon}
                      disabled={!values.address.communue}
                      value={field.value || ""}
                    >
                      {villages?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {values.address.communue && (
                      <FormHelperText sx={{ color: "red" }}>
                        {getIn(form.errors, field.name)}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              </Field>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="h4">Address Location</Typography>
            </Grid>

            <Grid item md={6} xs={12}>
              <InputField
                label="Latitude"
                fullWidth
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
                type="number"
                name="latitude"
                error={!!errors.latitude}
                helperText={errors.latitude}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputField
                label="Longitude"
                fullWidth
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
                type="number"
                name="longitude"
                error={!!errors.longitude}
                helperText={errors.longitude}
              />
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      <Grid item container xs={3} sx={{ alignSelf: "start" }}>
        <Grid item xs={12} pb={3}>
          <MainCard
            title={"Shop Photo"}
            renderIcon={() => (
              <LightTooltip title={<p>Recommended Size: 300 x 300px</p>}>
                <InfoOutlinedIcon />
              </LightTooltip>
            )}
          >
            <Grid item container xs={12} justifyContent={"center"} py={2}>
              <Box
                sx={{
                  padding: "14px",
                  display: "flex",
                  borderRadius: "100%",
                  border: "1px dashed #E8EBF1",
                  marginBottom: "10px",
                }}
              >
                <Avatar
                  sx={{
                    width: "130px",
                    height: "130px",
                    border: 0,
                    borderRadius: "100%",
                    backgroundColor: "#F5F5F5",
                  }}
                  src={`${PREFIX_IMAGE_URL}${values.profileImageUrl}`}
                >
                  <UploadFileIcon />
                </Avatar>
              </Box>
              <Typography px={4} textAlign={"center"}>
                Allowed *.jpeg, *.jpg, *.png max size of 3.1 MB
              </Typography>
            </Grid>
            <Button
              sx={{
                width: "100%",
                backgroundColor: orangeMain,
                color: primaryLight,
              }}
              onClick={handleLogoUpload}
            >
              Upload
              <input
                type="file"
                onChange={handleFileChange}
                ref={hiddenFileInput}
                style={{ display: "none" }}
              />
            </Button>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard title="More Action">
            <FormControlLabel
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: 0,
              }}
              control={
                <Switch
                  sx={{ m: 1 }}
                  checked={values.enabledTip}
                  onChange={(e) =>
                    setFieldValue("enabledTip", e.target.checked)
                  }
                />
              }
              label="Shop Tipping"
              labelPlacement="start"
            />
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ShopCreateForm;
