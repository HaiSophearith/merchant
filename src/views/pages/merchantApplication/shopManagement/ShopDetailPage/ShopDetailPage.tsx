import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import {
  Avatar,
  Box,
  FormControlLabel,
  Grid,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Breadcrumbs from "../../../../../ui-component/extended/Breadcrumbs";
import navigation from "../../../../../menu-items/index";

import {
  primaryDark,
  lineGray,
  gridSpacing,
  orangeMain,
  primaryGray,
  alertDuration,
  primaryGreen,
  frontDate,
} from "../../../../../store/constant";
import {
  BreadCrumbContainer,
  ButtonCustom,
  GridContainer,
  GridFooter,
  GridListContainer,
  GridStatus,
  EnabledLabel,
  style,
} from "../../../../../ui-component/CustomizeComponent";
import DefaultIcon from "../../../../../ui-component/DefaultIcon";
import { useParams } from "react-router-dom";
import { STATUS_LABEL } from "../../../../../types/types";
import { ChangeEvent, useMemo, useState } from "react";
import useQueryShop from "../../../../../hooks/useQueryShop";
import SettlementAccount from "./SettlementAccount";
import AddressInfo from "./AddressInfo";
import CounterList from "../../../../../ui-component/listCollection/CounterList";
import { PREFIX_IMAGE_URL } from "../../../../../config";
import MainCard from "../../../../../ui-component/cards/MainCard";
import { AxiosError } from "axios";
import { ErrorInfo } from "../../../../../types/types";
import ErrorDialog from "../../../../../ui-component/modal/ErrorDialog";
import useMutationReviewShop from "../../../../../hooks/useMutationReviewShop";
import capitalizeFirstCharacter from "../../../../../utils/convertStringToCapitalize";
import { format } from "date-fns";
import useMutationEnableShopTip from "../../../../../hooks/useMutationEnableShopTip";
import useMutationDisableShopTip from "../../../../../hooks/useMutationDisableShopTip";
import ConfirmModal from "../../../../../ui-component/modal/ConfirmModal";
import {
  COUNTER_CREATE_URL,
  COUNTER_UPDATE_URL,
} from "../../../../../routes/Routes";
import { useNavigate } from "react-router-dom";

const ShopDetail = ({
  businessId,
  shopId,
}: {
  businessId: string;
  shopId: string;
}) => {
  const { shop, refetch } = useQueryShop({
    businessId,
    shopId,
  });
  const { mutateAsync: reviewShop } = useMutationReviewShop();
  const [note, setNote] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [status, setStatus] = useState<STATUS_LABEL>(STATUS_LABEL.Unverified);
  const [openModalShopTip, setOpenModalShopTip] = useState(false);

  const handleCloseModalShopTip = () => {
    setOpenModalShopTip(!openModalShopTip);
  };

  const handleOpenModalShopTip = () => {
    setOpenModalShopTip(true);
  };

  const handleErrorDialog = () => {
    setOpenErrorDialog(!openErrorDialog);
    setTimeout(() => {
      setOpenErrorDialog(false);
    }, alertDuration);
  };

  const [open, setOpen] = useState<boolean>(false);

  const handleOpenToVerified = () => {
    setStatus(STATUS_LABEL.Verified);
    setOpen(true);
  };

  const handleOpenToEscalated = () => {
    setStatus(STATUS_LABEL.Escalated);
    setOpen(true);
  };

  const handleOpenToUnverified = () => {
    setStatus(STATUS_LABEL.Unverified);
    setOpen(true);
  };

  const handleOnCloseReview = () => {
    setOpen(false);
  };

  const handleReviewBusiness = async () => {
    try {
      await reviewShop({
        businessId,
        shopId,
        reviewProps: {
          note: note,
          status: status,
        },
      });
      handleOnCloseReview();
      setNote("");
      refetch();
    } catch (e) {
      const error = e as AxiosError<ErrorInfo>;
      setErrorMessage(error.response?.data.reason as string);
      handleErrorDialog();
    }
  };

  const { counters, bankAccounts } = useMemo(() => {
    const counters = shop?.counters || [];
    const bankAccounts = shop?.bankAccounts || [];
    return { counters, bankAccounts };
  }, [shop]);

  const profileImageUrl = useMemo(() => {
    if (!!shop?.profileImageUrl) {
      return `${PREFIX_IMAGE_URL}${shop?.profileImageUrl}`;
    }
    return "";
  }, [shop?.profileImageUrl]);

  const handleChangeRemark = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNote(value);
  };

  const { mutateAsync: enableShopTip } = useMutationEnableShopTip();
  const { mutateAsync: disableShopTip } = useMutationDisableShopTip();

  const handleConfirmOnShopTip = async () => {
    try {
      if (!!businessId && !!shopId && shop?.enabledTip) {
        await disableShopTip({
          businessId,
          shopId,
        });
        handleCloseModalShopTip();
      } else if (!!businessId && !!shopId && !shop?.enabledTip) {
        await enableShopTip({
          businessId,
          shopId,
        });
        handleCloseModalShopTip();
      }
    } catch (e) {
      const error = e as AxiosError<ErrorInfo>;
      setErrorMessage(error.response?.data.reason as string);
      handleErrorDialog();
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <BreadCrumbContainer>
        <Breadcrumbs
          separator={FiberManualRecord}
          navigation={navigation}
          icon
          title
          rightAlign
        />
      </BreadCrumbContainer>
      <Box sx={{ padding: "0 24px", marginBottom: "88px" }}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} md={9}>
            <GridContainer>
              <Grid sx={{ display: "flex" }}>
                <Grid
                  border="1px dashed"
                  borderColor={lineGray}
                  width="120px"
                  height="120px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="120px"
                  mb="24px"
                  mr="24px"
                >
                  <Avatar
                    sx={{
                      width: "102px",
                      height: "102px",
                      backgroundColor: lineGray,
                    }}
                    src={profileImageUrl}
                  >
                    {profileImageUrl === "" && <DefaultIcon />}
                  </Avatar>
                </Grid>
                <Grid>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ marginRight: "8px" }} variant="h2">
                      {shop?.name}
                    </Typography>
                    <EnabledLabel enabledLabel={shop?.enabled} />
                  </Box>
                  <Box>{shop?.type?.name}</Box>
                </Grid>
              </Grid>

              {shop && (
                <Grid container spacing={2}>
                  <Grid container item xs={12} md={6}>
                    <Grid item xs={12} sm={4}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: primaryGray,
                        }}
                      >
                        Phone Number
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: "16px",
                          color: primaryDark,
                        }}
                      >
                        {shop?.phoneNumber}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} md={6}>
                    <Grid item xs={12} sm={4}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: primaryGray,
                        }}
                      >
                        Telegram Link ID
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography
                        fontWeight="500"
                        fontSize="16px"
                        sx={{
                          color: primaryDark,
                        }}
                      >
                        {shop.telegramBot}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} md={6}>
                    <Grid item xs={12} sm={4}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: primaryGray,
                        }}
                      >
                        Created Date
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: "16px",
                          color: primaryDark,
                        }}
                      >
                        {format(new Date(shop.createdDate), frontDate)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {bankAccounts.length > 0 && (
                <SettlementAccount bankAccounts={bankAccounts} />
              )}

              {shop && <AddressInfo shop={shop} />}
            </GridContainer>

            <GridListContainer>
              <Grid
                sx={{
                  padding: "24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alightItem: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  Counter
                </Typography>

                <ButtonCustom
                  variant="orangeBtn"
                  onClick={() =>
                    navigate(
                      COUNTER_CREATE_URL.replace(
                        ":businessId",
                        businessId
                      ).replace(":shopId", shopId as string)
                    )
                  }
                  buttonLabel="Quick Create Counter"
                />
              </Grid>
              <Box>
                {counters.length > 0 && <CounterList counters={counters} />}
              </Box>
            </GridListContainer>
          </Grid>

          <Grid item sm={7} md={3}>
            <GridContainer>
              <Typography paddingBottom="24px" fontSize="20px" fontWeight="500">
                Review Status
              </Typography>
              {shop?.status === STATUS_LABEL.Verified && (
                <Box>
                  <GridStatus>
                    <Typography>Status Type</Typography>
                    {shop?.status === STATUS_LABEL.Verified && (
                      <Typography fontSize="14px" sx={{ color: primaryGreen }}>
                        {capitalizeFirstCharacter(shop?.status)}
                      </Typography>
                    )}
                  </GridStatus>

                  <Box pt="24px" display="flex" justifyContent="space-between">
                    <ButtonCustom
                      onClick={handleOpenToUnverified}
                      variant="blackBtn"
                      buttonLabel="Unverified"
                    />
                    <ButtonCustom
                      onClick={handleOpenToEscalated}
                      variant="orangeBtn"
                      buttonLabel="Escalated"
                    />
                  </Box>
                </Box>
              )}
              {shop?.status === STATUS_LABEL.Escalated && (
                <Box>
                  <GridStatus>
                    <Typography>Status Type</Typography>
                    <Typography fontSize="14px" sx={{ color: primaryGray }}>
                      {capitalizeFirstCharacter(shop?.status)}
                    </Typography>
                  </GridStatus>
                  <Box pt="24px" display="flex" justifyContent="space-between">
                    <ButtonCustom
                      onClick={handleOpenToUnverified}
                      variant="blackBtn"
                      buttonLabel="Unverified"
                    />
                    <ButtonCustom
                      onClick={handleOpenToVerified}
                      variant="orangeBtn"
                      buttonLabel="Verify"
                    />
                  </Box>
                </Box>
              )}

              {shop?.status === STATUS_LABEL.Unverified && (
                <Box>
                  <GridStatus>
                    <Typography>Status Type</Typography>
                    <Typography fontSize="14px" sx={{ color: orangeMain }}>
                      {capitalizeFirstCharacter(status)}
                    </Typography>
                  </GridStatus>

                  <Box pt="24px" display="flex" justifyContent="space-between">
                    <ButtonCustom
                      onClick={handleOpenToEscalated}
                      variant="blackBtn"
                      buttonLabel="Escalated"
                    />
                    <ButtonCustom
                      onClick={handleOpenToVerified}
                      variant="orangeBtn"
                      buttonLabel="Verify"
                    />
                  </Box>
                </Box>
              )}
            </GridContainer>
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
                    checked={shop?.enabledTip}
                    onChange={handleOpenModalShopTip}
                  />
                }
                label="Shop Tipping"
                labelPlacement="start"
              />
            </MainCard>
          </Grid>
        </Grid>
      </Box>

      <GridFooter gridSize="formFooter">
        <ButtonCustom
          variant="orangeBtn"
          buttonLabel="Edit"
          onClick={() =>
            navigate(
              COUNTER_UPDATE_URL.replace(":businessId", businessId).replace(
                ":shopId",
                shopId as string
              )
            )
          }
        />
      </GridFooter>

      <Modal open={open} onClose={handleOnCloseReview}>
        <Box sx={style}>
          <Typography variant="h3">Review Note</Typography>

          <Box py={2} pb={2}>
            <Grid item md={3} xs={12}>
              <TextField
                value={note}
                fullWidth
                label="Remark"
                onChange={handleChangeRemark}
              />
            </Grid>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              columnGap: 2,
            }}
          >
            <ButtonCustom
              onClick={handleOnCloseReview}
              variant="cancelBtn"
              buttonLabel="Cancel"
            />
            <ButtonCustom
              onClick={handleReviewBusiness}
              variant="orangeBtn"
              buttonLabel="Done"
            />
          </Box>
        </Box>
      </Modal>

      <ConfirmModal
        handleOnCancel={handleCloseModalShopTip}
        handleOnConfirm={handleConfirmOnShopTip}
        open={openModalShopTip}
        description={
          shop?.enabledTip
            ? "Are your sure you want to disable this shop tipping?"
            : "Are your sure you want to enable this shop tipping?"
        }
      />

      <ErrorDialog message={errorMessage} open={openErrorDialog} />

      <ErrorDialog open={openErrorDialog} message={errorMessage} />
    </>
  );
};

const ShopDetailPage = () => {
  const { businessId, shopId } = useParams();
  if (!businessId || !shopId) return <></>;
  return <ShopDetail businessId={businessId} shopId={shopId} />;
};
export default ShopDetailPage;
