import { FormikValues, useFormikContext } from "formik";
import InputField from "../../../../../ui-component/formField/InputField";
import MainCard from "../../../../../ui-component/cards/MainCard";
import { Box, Grid } from "@mui/material";

const CounterCreatePage = () => {
  const { errors } = useFormikContext<FormikValues>();
  return (
    <Grid xs={12} pt={3}>
      <Box sx={{ padding: "24px", paddingTop: "0" }}>
        <MainCard title="Counter Information">
          <Grid item container xs={6}>
            <InputField
              required
              InputProps={{
                style: {
                  borderRadius: "12px",
                },
              }}
              fullWidth
              label={"Counter Name"}
              name="counterName"
              error={!!errors.counterName}
              helperText={errors.counterName}
            />
          </Grid>
        </MainCard>
      </Box>
    </Grid>
  );
};
export default CounterCreatePage;
