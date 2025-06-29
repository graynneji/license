const yup = require("yup");
const licenseSchema = yup.object().shape({
  domain: yup.string().required("license key is required"),
  licenseKey: yup.string().required("license key is required"),
  supabaseUrl: yup.string().url().required("Supabase url is required"),
  supabaseKey: yup.string().required("Supabase ANON is required"),
});

module.exports = licenseSchema;
