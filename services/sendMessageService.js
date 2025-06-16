const { createClient } = require("@supabase/supabase-js");
const { getCache } = require("../utils/cache");
const cookie = require("cookie");

exports.handleSendMessage = async (
  senderId,
  recieverId,
  message,
  licenseKey
) => {
  try {
    const licenseDetails = getCache(licenseKey);
    const supabaseUrl = licenseDetails?.supabaseUrl;
    const supabaseKey = licenseDetails?.supabaseKey;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Invalid license details");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("messages").insert([
      {
        message: message,
        sender_id: senderId,
        reciever_id: recieverId,
      },
    ]);

    if (error) {
      return { success: false, error: error.message || error };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message || error };
  }
};
