const authService = require("../services/authService");
const userRegisterSchema = require("../validations/userSchema");
// const cookie = require("cookie");
// Register
exports.registerUser = async (req, res) => {
  // Registration logic here
  try {
    // Validate input using Yup
    await userRegisterSchema.validate(req.body, { abortEarly: false });

    const { name, email, phone, password, selectedOption, licenseKey } =
      req.body;

    const { data: sessionData, error } = await authService.handleLogin(
      email,
      password,
      licenseKey
    );

    if (error) {
      return res
        .status(401)
        .json({ error: "Access denied", details: error.message });
    }

    const { access_token, refresh_token, ...data } = sessionData.session;

    return res.status(201).json({ data: data });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "Invalid email or password format",
        details: error.errors,
      });
    }
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { licenseKey } = req.body;
  const licenseDetails = authService.handleLogin(licenseKey);
  if (licenseDetails) res.status(201).json({ message: "Success" });
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token_hash, type } = req.body;

    const { data, error } = await authService.handleVerify(token_hash, type);

    if (error)
      return res.status(401).json({
        error: "Access Denied",
        details: "Unable to verify email address",
      });
    return res.status(200).json({ message: "Success verifying email" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
