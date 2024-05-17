import React from "react";
import {
  BreadCrumbContainer,
  ButtonCustom,
  GridContainer,
  GridFooter,
  InfoTypo,
  StaticTypo,
} from "../../../ui-component/CustomizeComponent";
import Breadcrumbs from "../../../ui-component/extended/Breadcrumbs";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import navigation from "../../../menu-items/index";
import { Box, Chip, Container, Divider, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  frontDate,
  gridSpacing,
  orange14,
  orangeMain,
} from "../../../store/constant";
import useQueryReferral from "../../../hooks/useQueryReferral";
import ReferralCard from "../../../ui-component/cards/ReferralCard";
import RefereeCard from "../../../ui-component/cards/RefereeCard";
import { format } from "date-fns";
import capitalizeFirstCharacter from "../../../utils/convertStringToCapitalize";
import { REFERRAL_URL } from "../../../routes/Routes";
import { useNavigate } from "react-router";

const ViewReferralPage = () => {
  const navigate = useNavigate();
  const { referralId } = useParams();
  const refId = referralId as string;
  const { referral } = useQueryReferral({ referralId: refId });

  return (
    <>
      {referral && (
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
          <Container maxWidth={false}>
            <GridContainer>
              <Box sx={{ display: "flex" }}>
                <Typography fontSize="20px" fontWeight="600" marginRight="15px">
                  Referral Information
                </Typography>
                <Chip
                  sx={{ backgroundColor: orange14, color: orangeMain }}
                  label={capitalizeFirstCharacter(referral?.type)}
                />
              </Box>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid container item xs={12}>
                      <Grid item xs={12} sm={5}>
                        <StaticTypo>Business ID</StaticTypo>
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <InfoTypo>{referral.business.no}</InfoTypo>
                      </Grid>
                    </Grid>

                    <Grid container item xs={12}>
                      <Grid item xs={12} sm={5}>
                        <StaticTypo>Business Name</StaticTypo>
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <InfoTypo>{referral.business.name}</InfoTypo>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Divider
                  sx={{ borderStyle: "dashed" }}
                  orientation="vertical"
                  variant="middle"
                  flexItem
                />
                <Grid item sm={12} md={5.5}>
                  <Grid container spacing={2}>
                    <Grid container item xs={12}>
                      <Grid item xs={12} sm={5}>
                        <StaticTypo>Onboarding Date</StaticTypo>
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <InfoTypo>
                          {format(new Date(referral?.onboardedDate), frontDate)}
                        </InfoTypo>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={12} md={6}>
                  <Box sx={{ paddingBottom: "20px", paddingTop: "20px" }}>
                    <Typography fontSize="16px" fontWeight="600">
                      Referrer Information
                    </Typography>
                  </Box>
                  <ReferralCard referral={referral} />
                </Grid>
                <Grid item sm={12} md={6}>
                  <Box sx={{ paddingBottom: "20px", paddingTop: "20px" }}>
                    <Typography fontSize="16px" fontWeight="600">
                      Referee Information
                    </Typography>
                  </Box>
                  {!!referral?.referrerCustomer && (
                    <RefereeCard Referee={referral.referrerCustomer} />
                  )}
                </Grid>
              </Grid>
            </GridContainer>
          </Container>

          <Box sx={{ bottom: 0, position: "absolute", width: "100%" }}>
            <GridFooter gridSize="formFooter">
              <ButtonCustom
                onClick={() => navigate(REFERRAL_URL)}
                variant="cancelBtn"
                buttonLabel="Close"
              />
            </GridFooter>
          </Box>
        </>
      )}
    </>
  );
};

export default ViewReferralPage;
