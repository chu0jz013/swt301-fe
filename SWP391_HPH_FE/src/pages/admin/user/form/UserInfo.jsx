import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export default function UserInfo({ errors, control, register }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Full Name"
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={errors?.fullName?.message}
        />
      </Grid>

      <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          label="Phone"
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors?.phone?.message}
        />
      </Grid>
      <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
        <FormControl component={"fieldset"}>
          <FormLabel component={"legend"}>Gender</FormLabel>
          <Controller
            name="gender" // Replace with your form field name
            control={control} // Pass the form control from react-hook-form
            defaultValue={0} // Set the default value
            render={({ field }) => (
              <RadioGroup {...field} row>
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel value={1} control={<Radio />} label="Male" />
              </RadioGroup>
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Address"
          {...register("address")}
          error={!!errors.address}
          helperText={errors?.address?.message}
        />
      </Grid>
    </Grid>
  );
}
