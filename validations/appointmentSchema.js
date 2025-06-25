const yup = require("yup");
const appointmentSchema = yup.object().shape({
  message: yup
    .string()
    .max(1000, "Message should not be more than 1000 characters"),
});

module.exports = appointmentSchema;
