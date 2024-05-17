import { Grid } from "@mui/material";
import { InfoTypo, StaticTypo } from "../CustomizeComponent";
import { RefereeProps } from "../../types/types";
import MainCard from "./MainCard";
import { gray14 } from "../../store/constant";

const RefereeCard = ({ Referee }: { Referee: RefereeProps }) => {
  return (
    <MainCard sx={{ backgroundColor: gray14, height: "145px" }}>
      <Grid container spacing={2}>
        <Grid container item xs={12}>
          <Grid item xs={12} sm={5}>
            <StaticTypo>Referee Name</StaticTypo>
          </Grid>
          <Grid item xs={12} sm={7}>
            <InfoTypo>{Referee.fullName}</InfoTypo>
          </Grid>
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={12} sm={5}>
            <StaticTypo>Referee Phone Number</StaticTypo>
          </Grid>
          <Grid item xs={12} sm={7}>
            <InfoTypo>{Referee.phoneNumber}</InfoTypo>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};
export default RefereeCard;
