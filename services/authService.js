const { createClient } = require("@supabase/supabase-js");
const { getCache } = require("../utils/cache");
const cookie = require("cookie");

exports.handleLogin = async (licenseKey) => {
  const licenseDetails = getCache(licenseKey);
  const supabaseUrl = licenseDetails?.supabaseUrl;
  const supabaseKey = licenseDetails?.supabaseKey;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Invalid license details");
  }

  return licenseDetails;
};

exports.handleVerify = async (token_hash, type, licenseKey) => {
  try {
    const licenseDetails = getCache(licenseKey);
    const supabaseUrl = licenseDetails?.supabaseUrl;
    const supabaseKey = licenseDetails?.supabaseKey;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Invalid license details");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    if (token_hash && type) {
      const { error: otpError } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });
      if (!otpError) {
        // redirect user to specified redirect URL or root of app
        // redirect(next); // Only call this if you have a redirect function in scope
        return { success: true };
      } else {
        return { success: false, error: otpError };
      }
    } else {
      throw new Error("Missing token_hash or type");
    }
  } catch (error) {
    return { success: false, error };
  }
};
