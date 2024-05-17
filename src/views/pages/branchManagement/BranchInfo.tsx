import { Grid } from "@mui/material";
import { InfoTypo, StaticTypo } from "../../../ui-component/CustomizeComponent";
import { BranchProps } from "../../../types/types";

const BranchInfo = ({ branch }: { branch: BranchProps }) => {
  return (
    <Grid container spacing={2}>
      <Grid container item xs={12}>
        <Grid item xs={12} sm={5}>
          <StaticTypo>Regional</StaticTypo>
        </Grid>
        <Grid item xs={12} sm={7}>
          <InfoTypo>{branch.regional.name}</InfoTypo>
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={12} sm={5}>
          <StaticTypo>Phone Number</StaticTypo>
        </Grid>
        <Grid item xs={12} sm={7}>
          <InfoTypo>{branch.phoneNumber}</InfoTypo>
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={12} sm={5}>
          <StaticTypo>Email</StaticTypo>
        </Grid>
        <Grid item xs={12} sm={7}>
          <InfoTypo>{branch.email}</InfoTypo>
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={12} sm={5}>
          <StaticTypo>City/Province</StaticTypo>
        </Grid>
        <Grid item xs={12} sm={7}>
          <InfoTypo>{branch.province.name}</InfoTypo>
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={12} sm={5}>
          <StaticTypo>Address</StaticTypo>
        </Grid>
        <Grid item xs={12} sm={7}>
          <InfoTypo>{branch.address}</InfoTypo>
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={12} sm={5}>
          <StaticTypo>Latitude & Longitude</StaticTypo>
        </Grid>
        <Grid item xs={12} sm={7}>
          {branch.latitude} , {branch.longitude}
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={12} sm={5}>
          <StaticTypo>Description</StaticTypo>
        </Grid>
        <Grid item xs={12} sm={7}>
          <InfoTypo>{branch.description}</InfoTypo>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default BranchInfo;
