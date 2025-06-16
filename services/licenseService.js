const License = require("../models/licenseModel");
exports.handleLicense = async (
  domain,
  supabaseUrl,
  supabaseKey,
  licenseKey
) => {
  const license = new License({ domain, supabaseUrl, supabaseKey, licenseKey });
  await license.save();
  return license;
};

exports.getLicense = async (licenseKey) => {
  const licenseUser = await License.findOne({ licenseKey });
  return licenseUser;
};
