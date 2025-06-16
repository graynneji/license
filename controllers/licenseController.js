const licenseSchema = require("../validations/licenseSchema");
const licenseService = require("../services/licenseService");
const { setCache } = require("../utils/cache");

exports.registerLicense = async (req, res) => {
  try {
    await licenseSchema.validate(req.body, { abortEarly: false });
    const { domain, supabaseUrl, supabaseKey, licenseKey } = req.body;
    const savedLicense = await licenseService.handleLicense(
      domain,
      supabaseUrl,
      supabaseKey,
      licenseKey
    );
    res.status(201).json({ message: "License saved", license: savedLicense });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Invalid input", details: error.errors });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getLicense = async (req, res) => {
  try {
    const { licenseKey, domain } = req.body;
    const licenseDetails = await licenseService.getLicense(licenseKey);
    if (!licenseDetails)
      return res.status(404).json({ error: "License not found" });

    if (!licenseDetails.active)
      return res
        .status(403)
        .json({ error: "Not authorized to use this software" });

    if (!licenseDetails?.extended && licenseDetails?.domain?.includes(domain))
      return res
        .status(403)
        .json({ error: "License is not valid for this domain" });

    setCache(licenseKey, licenseDetails);
    res
      .status(201)
      .json({ message: "License information", data: licenseDetails });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
