import {
  Avatar,
  FormControl,
  Grid,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  IconButton,
  Tooltip,
  styled,
  tooltipClasses,
  TooltipProps,
  FormControlLabel,
  Switch,
  InputAdornment,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  gridSpacing,
  orangeMain,
  primaryLight,
} from "../../../../../store/constant";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box } from "@mui/system";
import useQueryBusinessCategories from "../../../../../hooks/useQueryBusinessCategories";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Field, FieldProps, FormikValues, useFormikContext } from "formik";
import InputField from "../../../../../ui-component/formField/InputField";
import MainCard from "../../../../../ui-component/cards/MainCard";
import { useDropzone } from "react-dropzone";
import CancelIcon from "@mui/icons-material/Cancel";
import useMutationFileUpload from "../../../../../hooks/useMutationFileUpload";
import useQueryGetReferralCode from "../../../../../hooks/useQueryReferralCode";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import { PREFIX_IMAGE_URL } from "../../../../../config";
import {
  ButtonCustom,
  GridFooter,
} from "../../../../../ui-component/CustomizeComponent";
import { ConfirmationDialog } from "../businessUpdatePage/BusinessUpdatePage";
import { BUSINESS_URL } from "../../../../../routes/Routes";
import { useNavigate } from "react-router";

export const businessTypes = [
  { label: "OFFICIAL NAME", value: "OFFICIAL_NAME" },
  { label: "PREFERRED NAME", value: "PREFERRED_NAME" },
  { label: "SETTLEMENT ACCOUNT NAME", value: "SETTLEMENT_ACCOUNT_NAME" },
];
export const marchantTypes = [
  { label: "CORPORATE", value: "CORPORATE" },
  { label: "RETAILER", value: "RETAILER" },
];

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: "12px",
    borderRadius: "10px",
  },
}));

interface MyDropzoneProps {
  maxFiles?: number;
  fieldName: string;
  className?: string;
  files: {
    url: string;
  }[];
}

export interface UploadFile {
  url: string;
}

export function MyDropzone({
  files = [],
  maxFiles = 5,
  fieldName,
  className,
}: MyDropzoneProps) {
  const { setFieldValue } = useFormikContext<FormikValues>();
  const { mutateAsync: fileUpload } = useMutationFileUpload();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        const newFiles: File[] = acceptedFiles.map((file) => file);

        for (const file of newFiles) {
          const res = await fileUpload({ file });
          const fileToBeUpload = [...files, { url: res }];
          setFieldValue(fieldName, fileToBeUpload);
        }
      }
    },
    [fieldName, files, setFieldValue, fileUpload]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: maxFiles,
    accept: {
      files: [".jpg", ".png", ".pdf"],
    },
  });

  return (
    <div {...getRootProps({ className: className })}>
      <input {...getInputProps()} disabled={files.length > maxFiles} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drop files here or click browse thorough your machine</p>
      )}
    </div>
  );
}

interface ReferralInfo {
  name: string;
  phoneNumber: string;
  position: string;
}

const BusinessForm = ({ id }: { id?: string }) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [referralInfo, setReferralInfo] = useState<ReferralInfo | null>(null);
  const [open, setOpen] = useState(false);

  const { errors, values, handleChange, touched, setFieldValue } =
    useFormikContext<FormikValues>();

  const {
    mutate: fileUpload,
    data: logoUrl,
    status: fileUploadStatus,
  } = useMutationFileUpload();
  const { businessCategoies } = useQueryBusinessCategories();

  useEffect(() => {
    if (fileUploadStatus === "success") {
      setFieldValue("logoUrl", logoUrl);
    }
  }, [fileUploadStatus, logoUrl, setFieldValue]);

  const categories = useMemo(() => {
    if (!businessCategoies) return [];
    const result = Object.values(businessCategoies).map((item) => {
      return { value: item.id, label: item.name };
    });
    return result || [];
  }, [businessCategoies]);

  const handleRemoveFile = (file: UploadFile, fieldName: string) => {
    const filteredDocuments = values.supportedDocuments.filter(
      (item: UploadFile) => item.url !== file.url
    );
    setFieldValue(fieldName, filteredDocuments);
  };

  const handleRemoveAllFiles = (fieldName: string) => {
    setFieldValue(fieldName, []);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    if (!fileUploaded) return;
    fileUpload({ file: fileUploaded });
  };

  const handleLogoUpload = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const { referral, refetch: refetchReferralCode } = useQueryGetReferralCode(
    values?.referralCode
  );

  useEffect(() => {
    if (referral) setReferralInfo(referral);
  }, [referral]);

  useEffect(() => {
    if (id) return;
    if (values.referralCode && Math.min(values.referralCode.length, 6) > 4) {
      refetchReferralCode();
    } else setReferralInfo(null);
    // eslint-disable-next-line
  }, [values.referralCode, id]);

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value;
    input = input.replace(/^0+|\D/g, "");
    setFieldValue("businessPhoneNumber", `${input}`);
  };

  const navigate = useNavigate();

  return (
    <Grid sx={{ padding: "24px", marginBottom: "80px" }} spacing={3} container>
      <Grid item container md={9} xs={6}>
        <MainCard title="Business Information">
          <Grid container spacing={gridSpacing}>
            <Grid item container xs={6}>
              <Field name="businessType">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    fullWidth
                    error={form.errors.businessType !== undefined}
                  >
                    <InputLabel required>Business Type</InputLabel>
                    <Select
                      {...field}
                      sx={{ borderRadius: "12px" }}
                      id="business-type"
                      label={"Business Type"}
                      IconComponent={KeyboardArrowDownIcon}
                      disabled={!!id}
                      value={field.value || ""}
                    >
                      {businessTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {form.errors.businessType && (
                      <FormHelperText sx={{ color: "red" }}>
                        {form.errors.businessType as string}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              </Field>
            </Grid>
            <Grid item xs={6}>
              <InputField
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
                name={"businessName"}
                value={values.businessName}
                fullWidth
                label="Business Name"
                required
                onChange={handleChange}
                error={touched.businessName && Boolean(errors.businessName)}
                helperText={touched.businessName && errors.businessName}
              />
            </Grid>

            <Grid item xs={6}>
              <Field name="merchantType">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    fullWidth
                    error={form.errors.merchantType !== undefined}
                  >
                    <InputLabel required>Merchant Type</InputLabel>
                    <Select
                      {...field}
                      sx={{ borderRadius: "12px" }}
                      id="merchant-type"
                      label={"Merchant Type"}
                      IconComponent={KeyboardArrowDownIcon}
                      value={field.value || ""}
                    >
                      {marchantTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.merchantType && (
                      <FormHelperText sx={{ color: "red" }}>
                        {form.errors.merchantType as string}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              </Field>
            </Grid>

            <Grid item xs={6}>
              <Field name="businessCategory">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    fullWidth
                    error={form.errors.businessCategory !== undefined}
                  >
                    <InputLabel required>Business Category</InputLabel>
                    <Select
                      {...field}
                      sx={{ borderRadius: "12px" }}
                      id="business-category"
                      label={"Business Category"}
                      IconComponent={KeyboardArrowDownIcon}
                      error={!!form.errors.businessCategory}
                      disabled={!!id}
                      value={field.value || ""}
                    >
                      {categories?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.businessCategory && (
                      <FormHelperText sx={{ color: "red" }}>
                        {form.errors.businessCategory as string}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              </Field>
            </Grid>
            <Grid item xs={6}>
              <InputField
                name={"businessPhoneNumber"}
                fullWidth
                value={values.businessPhoneNumber}
                error={!!errors.businessPhoneNumber}
                helperText={errors.businessPhoneNumber}
                label="Business Owner Phone Number"
                onChange={handlePhoneNumberChange}
                required
                disabled={!!id}
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                  startAdornment: !id ? (
                    <InputAdornment position="start">+855</InputAdornment>
                  ) : undefined,
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <InputField
                name="cif"
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
                label="CIF"
                required
                fullWidth
                disabled={id}
                value={values.cif}
                error={!!errors.cif}
                helperText={errors.cif}
              />
            </Grid>
            <Box px={3}>
              <Typography variant="h3" py={2}>
                Referrer Information
              </Typography>
              <Typography variant="body1">
                Input Referrer number to find the informations of Referrer.
              </Typography>
            </Box>
            <Grid item xs={12}>
              <InputField
                required
                label="Referrer Number"
                fullWidth
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
                disabled={id}
                value={values.referralCode}
                name={"referralCode"}
                error={!!errors.referralCode}
                helperText={errors.referralCode}
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  borderRadius: "12px",
                  border: "0.5px solid #E9EFF4",
                  background: "rgba(247, 247, 247, 0.97)",
                  width: "100%",
                  minHeight: "100px",
                  padding: "20px",
                }}
              >
                <Grid container rowGap={2}>
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={4}>
                          <InputLabel>Referrer Name</InputLabel>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{referralInfo?.name}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6}>
                          <InputLabel>Referrer Phone Number</InputLabel>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>{referralInfo?.phoneNumber}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container alignItems={"center"}>
                    <Grid item xs={6}>
                      <Grid container spacing={2} alignItems={"center"}>
                        <Grid item xs={4}>
                          <InputLabel>Position</InputLabel>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{referralInfo?.position}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item container xs={3} sx={{ alignSelf: "start" }}>
        <MainCard
          title={"Business Logo"}
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
                src={`${PREFIX_IMAGE_URL}${values.logoUrl}`}
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

      <Grid xs={12} pt={3} pl={3}>
        <MainCard
          title="Business Supported Documents"
          renderIcon={() => (
            <LightTooltip
              title={
                <>
                  <li>Memorandum and Articles of Association</li>
                  <li>Certificate of Incorporation</li>
                  <li>
                    Approval Letter to Operate Business Issued by the Concerned
                    Ministry or Related Authority
                  </li>
                  <li>Photo of the business</li>
                  <li>Business patent</li>
                  <li>Business license</li>
                </>
              }
            >
              <InfoOutlinedIcon />
            </LightTooltip>
          )}
        >
          <Typography>
            Max file size is 5 MB. Supported file types are .jpg, .png, and
            .pdf.
          </Typography>
          <Grid
            xs={12}
            sx={{
              marginTop: "24px",
              border: "1px dashed #E8EBF1",
              background: "rgba(238, 238, 238, 0.60)",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <Box display="flex" alignItems="center">
              <Avatar sx={{ width: "48px", height: "48px" }} variant="rounded">
                <UploadFileIcon />
              </Avatar>
              <Box ml={2}>
                <Typography variant="h4">Drop or Select file</Typography>
                <MyDropzone
                  fieldName="supportedDocuments"
                  files={values.supportedDocuments || []}
                />
              </Box>
            </Box>
          </Grid>
          {values.supportedDocuments?.length > 0 &&
            values.supportedDocuments.map((file: UploadFile) => (
              <Box
                key={file.url}
                sx={{
                  display: "flex",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  margin: "10px 0 10px 0",
                  border: "1px solid #E3E3E3",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                  }}
                >
                  <DescriptionTwoToneIcon sx={{ marginRight: "10px" }} />
                  <a
                    href={`${PREFIX_IMAGE_URL}${file.url}`}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    {file.url}
                  </a>
                </Box>
                <IconButton
                  onClick={() => handleRemoveFile(file, "supportedDocuments")}
                >
                  <CancelIcon />
                </IconButton>
              </Box>
            ))}
          {values.supportedDocuments?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "16px",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: "black",
                  border: "1px solid grey",
                  borderRadius: "10px",
                }}
                onClick={() => handleRemoveAllFiles("supportedDocuments")}
              >
                Remove All
              </Button>
            </Box>
          )}
        </MainCard>
      </Grid>
      <Grid xs={12} pt={3} pl={3}>
        <MainCard
          title="Attached File Requested"
          renderIcon={() => (
            <LightTooltip
              title={
                <>
                  <li>Lorem ipsum dolor sit amet consectetur.</li>
                  <li>Aliquet ut ultricies sapien diam viverra.</li>
                </>
              }
            >
              <InfoOutlinedIcon />
            </LightTooltip>
          )}
        >
          <Typography>
            Max file size is 5 MB. Supported file types are .jpg, .png, and
            .pdf.
          </Typography>
          <Grid
            item
            xs={12}
            sx={{
              marginTop: "24px",
              border: "1px dashed #E8EBF1",
              background: "rgba(238, 238, 238, 0.60)",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <Box display="flex" alignItems="center">
              <Avatar sx={{ width: "48px", height: "48px" }} variant="rounded">
                <UploadFileIcon />
              </Avatar>
              <Box ml={2}>
                <Typography variant="h4">Drop or Select file</Typography>
                <MyDropzone
                  fieldName="creationDocuments"
                  files={values.creationDocuments || []}
                />
              </Box>
            </Box>
          </Grid>
          {values.creationDocuments?.length > 0 &&
            values.creationDocuments.map((file: UploadFile) => (
              <Box
                key={file.url}
                sx={{
                  display: "flex",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  margin: "10px 0 10px 0",
                  border: "1px solid #E3E3E3",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                  }}
                >
                  <DescriptionTwoToneIcon sx={{ marginRight: "10px" }} />
                  {file.url}
                </Box>
                <IconButton
                  onClick={() => handleRemoveFile(file, "creationDocuments")}
                >
                  <CancelIcon />
                </IconButton>
              </Box>
            ))}
          {values.creationDocuments?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "16px",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: "black",
                  border: "1px solid grey",
                  borderRadius: "10px",
                }}
                onClick={() => handleRemoveAllFiles("creationDocuments")}
              >
                Remove All
              </Button>
            </Box>
          )}
        </MainCard>
      </Grid>
      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        content="Are you sure you want to disable this business?"
        handleConfirmation={() => {
          setFieldValue("enabled", !values.enabled);
          setOpen(false);
        }}
      />
      {id && (
        <Box bottom="0" position="absolute" width="100%">
          <GridFooter gridSize={"large"}>
            <FormControlLabel
              control={
                <Switch
                  sx={{ m: 1 }}
                  checked={values.enabled}
                  name="enabled"
                  onChange={() => setOpen(true)}
                />
              }
              label={!!values.enabled ? "Active" : "Inactive"}
            />
            <div>
              <ButtonCustom
                onClick={() => navigate(BUSINESS_URL)}
                variant="cancelBtn"
                buttonLabel="Cancel"
              />
              <ButtonCustom
                type="submit"
                variant="orangeBtn"
                buttonLabel="Save"
              />
            </div>
          </GridFooter>
        </Box>
      )}
    </Grid>
  );
};

export default BusinessForm;
