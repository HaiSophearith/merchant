import * as yup from "yup";

export const businessSchema = yup.object().shape({
  businessType: yup.string(),
  businessName: yup.string().required("required"),
  merchantType: yup.string().required("required"),
  businessCategory: yup.string().required("required"),
  businessPhoneNumber: yup.string().min(8).max(9).required("required"),
  cif: yup
    .string()
    .matches(/^[0-9]+$/, "Please enter only numbers")
    .required("required"),
  referralCode: yup
    .string()
    .matches(/^[0-9]+$/, "Please enter only numbers")
    .min(5, "referral number must be at least 5 digits")
    .max(6, "referral number must be at most 6 digits")
    .required("required"),
});

export const shopSchema = yup.object().shape({
  shopName: yup.string().required("required").min(5).max(25),
  shopType: yup.string().required("required"),
  phoneNumber: yup.string().optional(),
  telegramBot: yup.string().optional(),
  bankAccountUSD: yup.string().optional(),
  bankAccountKHR: yup.string().optional(),
  addressLine1: yup.string().optional().nullable(),
  latitude: yup.number().optional(),
  longitude: yup.number().optional(),
  address: yup.object().shape({
    province: yup.string().required("required"),
    district: yup.string().required("required"),
    communue: yup.string().required("required"),
    village: yup.string().required("required"),
  }),
});

export const counterSchema = yup.object().shape({
  counterName: yup.string().required("required"),
});
