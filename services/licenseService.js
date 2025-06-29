const Keys = require("../models/keysModel");
const License = require("../models/licenseModel");
const { setCache, getCache } = require("../utils/cache");
exports.handleLicense = async (credentials) => {
  const { domain, supabaseUrl, supabaseKey, licenseKey } = credentials;

  // 1. Check cache only, and return if found (do nothing else)
  const licenseDetails = await getCache(licenseKey);
  if (licenseDetails) {
    return licenseDetails; // Immediately return if in cache
  }

  // 2. Only reach here if not in cache
  const licenseUser = await License.findOne({ licenseKey });
  if (licenseUser) {
    await setCache(licenseKey, licenseUser); // Optionally cache it for the future
    return licenseUser;
  }

  const keyExists = await Keys.findOne({ key: licenseKey });
  if (!keyExists) {
    throw new Error("Invalid License key");
  }

  const license = new License({ domain, supabaseUrl, supabaseKey, licenseKey });
  await license.save();
  await setCache(licenseKey, license); // Optionally cache new license
  return license;
};

exports.getLicense = async (licenseKey) => {
  const licenseUser = await License.findOne({ licenseKey });
  return licenseUser;
};
