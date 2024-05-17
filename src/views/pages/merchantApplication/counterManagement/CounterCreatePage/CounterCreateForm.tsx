import React, { useState } from "react";
import { Box, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { Form, FormikValues, useFormikContext } from "formik";
import { useParams } from "react-router-dom";
import {
  ButtonCustom,
  GridFooter,
} from "../../../../../ui-component/CustomizeComponent";
import MainCard from "../../../../../ui-component/cards/MainCard";
import { ConfirmationDialog } from "../../businessManagement/businessUpdatePage/BusinessUpdatePage";
import { VIEW_SHOP } from "../../../../../routes/Routes";
import { useNavigate } from "react-router-dom";

const CounterCreateForm = () => {
  const { businessId } = useParams();
  const [open, setOpen] = useState(false);
  const { values, dirty, setFieldValue, handleChange, touched, errors } =
    useFormikContext<FormikValues>();

  const navigate = useNavigate();

  return (
    <>
      <Form>
        <Box sx={{ padding: "0 24px" }}>
          <MainCard title="Counter Information">
            <Grid md={6} xs={12}>
              <TextField
                required
                fullWidth
                label="Counter Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={errors.name as string}
              />
            </Grid>
          </MainCard>
        </Box>
        <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          <GridFooter gridSize={values.id ? "large" : "formFooter"}>
            {values.id && (
              <FormControlLabel
                control={
                  <Switch
                    sx={{ m: 1 }}
                    id="enabled"
                    name="enabled"
                    checked={values.enabled}
                    onChange={() => setOpen(true)}
                  />
                }
                label={values.enabled ? "Active" : "Inactive"}
              />
            )}
            <div>
              <ButtonCustom
                variant="cancelBtn"
                buttonLabel="Cancel"
                onClick={() =>
                  navigate(
                    VIEW_SHOP.replace(":businessId", businessId as string)
                  )
                }
              />
              <ButtonCustom
                type="submit"
                variant="orangeBtn"
                disabled={!dirty}
                buttonLabel={values.id ? "Save" : "Create"}
              />
            </div>
          </GridFooter>
        </Box>
      </Form>
      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        content="Are you sure you want to update this record?"
        handleConfirmation={() => {
          setFieldValue("enabled", !values.enabled);
          setOpen(false);
        }}
      />
    </>
  );
};
export default CounterCreateForm;
