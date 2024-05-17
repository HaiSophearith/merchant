import { TextField } from "@mui/material";
import { useField } from "formik";

export default function InputField(props: any) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);

  return (
    <TextField
      type="text"
      error={meta.touched && meta.error}
      {...field}
      {...rest}
    />
  );
}
