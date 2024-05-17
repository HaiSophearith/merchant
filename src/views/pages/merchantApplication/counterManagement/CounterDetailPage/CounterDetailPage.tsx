import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import { Box, Chip, Divider, Grid, Typography } from "@mui/material";
import Breadcrumbs from "../../../../../ui-component/extended/Breadcrumbs";
import navigation from "../../../../../menu-items/index";
import useQueryCounter from "../../../../../hooks/useQueryCounter";
import useQueryBusinessDetail from "../../../../../hooks/useQueryBusinessDetail";
import {
  BreadCrumbContainer,
  ButtonComponent,
} from "../../../../../ui-component/CustomizeComponent";
import { useNavigate, useParams } from "react-router-dom";
import MainCard from "../../../../../ui-component/cards/MainCard";
import useQueryShop from "../../../../../hooks/useQueryShop";
import {
  green15,
  orangeMain,
  primaryDark,
  primaryGray,
  primaryGreen,
  primaryLight,
} from "../../../../../store/constant";
import { COUNTER_UPDATE_URL } from "../../../../../routes/Routes";
import { convertStringToDate } from "../../../../../ui-component/Announcements/AnnouncementList";

const CounterDetail = ({
  counterId,
  businessId,
  shopId,
}: {
  counterId: string;
  shopId: string;
  businessId: string;
}) => {
  const navigate = useNavigate();
  const { eachBusiness } = useQueryBusinessDetail({
    businessId,
  });

  const { counter } = useQueryCounter({
    shopId,
    counterId,
  });

  const { shop } = useQueryShop({
    businessId,
    shopId,
  });

  const handleEdit = () => {
    navigate(
      COUNTER_UPDATE_URL.replace(":businessId", businessId as string)
        .replace(":shopId", shopId as string)
        .replace(":counterId", counterId as string)
    );
  };

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
        <MainCard title="Counter Information">
          <Grid container xs={12}>
            <Grid item xs={5.5} container spacing={2}>
              <Grid container item xs={12}>
                <Grid item xs={12} sm={4}>
                  <Typography color={primaryGray}>Counter Name</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box sx={{ display: "flex" }}>
                    <Typography>{counter?.name}</Typography>
                    {counter?.enabled && (
                      <Chip
                        sx={{
                          px: 1,
                          mx: 2,
                          color: counter.enabled ? primaryGreen : undefined,
                          bgcolor: counter.enabled ? green15 : undefined,
                        }}
                        size="small"
                        label={counter.enabled ? "Active" : "Inactive"}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={12} sm={4}>
                  <Typography color={primaryGray}>Created Date</Typography>
                </Grid>
                {counter?.createdDate && (
                  <Typography>
                    {convertStringToDate(counter?.createdDate, "dd MMM, yyyy")}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid item container xs={1}>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item xs={5.5} container spacing={2}>
              <Grid container item xs={12}>
                <Grid item xs={12} sm={4}>
                  <Typography color={primaryGray}>Business Name</Typography>
                </Grid>
                <Typography>{eachBusiness?.name}</Typography>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={12} sm={4}>
                  <Typography color={primaryGray}>Shop Name</Typography>
                </Grid>
                <Typography>{shop?.name}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Box>
      <Grid
        sx={{
          width: "100%",
          backgroundColor: primaryLight,
          boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
          bottom: 0,
          padding: "20px 24px",
          position: "absolute",
        }}
        xs={12}
        container
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          <ButtonComponent
            sx={{ backgroundColor: orangeMain, color: primaryDark }}
            onClick={handleEdit}
          >
            Edit
          </ButtonComponent>
        </Box>
      </Grid>
    </>
  );
};

const CounterDetailPage = () => {
  const { shopId, counterId, businessId } = useParams();
  if (!shopId || !counterId || !businessId) return <></>;
  return (
    <CounterDetail
      shopId={shopId}
      businessId={businessId}
      counterId={counterId}
    />
  );
};
export default CounterDetailPage;
