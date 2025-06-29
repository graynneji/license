const licenseSchema = require("../validations/licenseSchema");
const licenseService = require("../services/licenseService");
const { setCache } = require("../utils/cache");

exports.registerLicense = async (req, res) => {
  try {
    const licenseKey = req.headers["soullve-license-key"];
    const supabaseUrl = req.headers["soullve-supabase-url"];
    const supabaseKey = req.headers["soullve-supabase-anon-key"];
    const domain = req.headers["soullve-host-name"];
    if (!licenseKey || !supabaseUrl || !supabaseKey || !domain) {
      return res.status(400).json({ error: "Missing required headers" });
    }
    const credentials = {
      domain,
      supabaseUrl,
      supabaseKey,
      licenseKey,
    };
    await licenseSchema.validate(credentials, { abortEarly: false });

    const savedLicense = await licenseService.handleLicense(credentials);
    if (!savedLicense) {
      return res.status(400).json({ error: "License registration failed" });
    }

    res.status(201).json({ message: "License saved", license: savedLicense });
  } catch (error) {
    console.log("Error in registerLicense:", error);
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
