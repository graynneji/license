const yup = require("yup");

const userLoginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
const userRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name should be more than 3 character"),
  email: yup.string().email().required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

module.exports = userLoginSchema;
