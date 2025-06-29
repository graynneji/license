const { createClient } = require("@supabase/supabase-js");
const { getCache } = require("../utils/cache");
const cookie = require("cookie");

exports.handleSendMessage = async (
  senderId,
  receiverId,
  message,
  licenseKey
) => {
  try {
    const licenseDetails = await getCache(licenseKey);
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
        reciever_id: receiverId,
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

/**
 * Handles fetching messages for a user (as sender or receiver).
 * @param {string} userId
 * @param {string} licenseKey
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
exports.handleGetMessages = async (userId, licenseKey) => {
  try {
    const licenseDetails = await getCache(licenseKey);
    const supabaseUrl = licenseDetails?.supabaseUrl;
    const supabaseKey = licenseDetails?.supabaseKey;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Invalid license details");
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${userId},reciever_id.eq.${userId}`)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      throw new Error("Database error: " + error.message);
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || error };
  }
};

/**
 * Service to get the last N messages exchanged between two users (ordered ascending).
 * @param {string} userId
 * @param {string} receiverId
 * @param {number} limit
 * @param {string} licenseKey
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
exports.handleGetUserPairMessages = async (
  userId,
  receiverId,
  limit,
  licenseKey
) => {
  try {
    const licenseDetails = await getCache(licenseKey);
    const supabaseUrl = licenseDetails?.supabaseUrl;
    const supabaseKey = licenseDetails?.supabaseKey;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Invalid license details");
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get total count of messages between the two users
    const { count, error: countError } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .or(
        `and(sender_id.eq.${userId},reciever_id.eq.${receiverId}),and(sender_id.eq.${receiverId},reciever_id.eq.${userId})`
      );

    if (countError) {
      throw new Error("Database error: " + countError.message);
    }

    const messagesToFetch = Math.min(count || 0, limit);

    // Fetch the latest N messages (ascending order)
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(
        `and(sender_id.eq.${userId},reciever_id.eq.${receiverId}),and(sender_id.eq.${receiverId},reciever_id.eq.${userId})`
      )
      .order("created_at", { ascending: true })
      .range((count || 0) - messagesToFetch, (count || 0) - 1);

    if (error) {
      throw new Error("Database error: " + error.message);
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || error };
  }
};
