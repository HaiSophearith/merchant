import { Grid } from "@mui/material";
import { InfoTypo, StaticTypo } from "../CustomizeComponent";
import { ReferralDetail } from "../../types/types";
import MainCard from "./MainCard";
import { gray14 } from "../../store/constant";

const ReferralCard = ({ referral }: { referral: ReferralDetail }) => {
  return (
    <MainCard sx={{ backgroundColor: gray14, height: "145px" }}>
      <Grid container spacing={2}>
        <Grid container item xs={12}>
          <Grid item xs={12} sm={5}>
            <StaticTypo>Referrer Code</StaticTypo>
          </Grid>
          <Grid item xs={12} sm={7}>
            <InfoTypo>{referral.referralCode}</InfoTypo>
          </Grid>
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={12} sm={5}>
            <StaticTypo>Referrer Name</StaticTypo>
          </Grid>
          <Grid item xs={12} sm={7}>
            <InfoTypo>{referral.referrerName}</InfoTypo>
          </Grid>
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={12} sm={5}>
            <StaticTypo>Referrer Phone Number</StaticTypo>
          </Grid>
          <Grid item xs={12} sm={7}>
            <InfoTypo>{referral.phoneNumber}</InfoTypo>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};
export default ReferralCard;
