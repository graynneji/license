const { createClient } = require("@supabase/supabase-js");
const { getCache } = require("../utils/cache");

/**
 * Fetches appointments for a patient and therapist.
 * @param {string} userId - The patient's unique ID.
 * @param {string} therapistId - The therapist's unique ID.
 * @param {string} licenseKey - The license key for authentication.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
exports.getAppointments = async (userId, therapistId, licenseKey) => {
  try {
    const licenseDetails = await getCache(licenseKey);
    const supabaseUrl = licenseDetails?.supabaseUrl;
    const supabaseKey = licenseDetails?.supabaseKey;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Invalid license details");
    }
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("appointment")
      .select("id, title, start, backgroundColor, borderColor")
      .match({ patient_id: userId, therapist_id: therapistId });

    if (error) throw new Error("Database error: " + error.message);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
};

/**
 * Schedules a new appointment for a user with a therapist.
 * @param {Object} options - Includes userId, therapistId, and color for the event.
 * @param {string} options.userId - The user's unique ID.
 * @param {string} options.therapistId - The therapist's unique ID.
 * @param {string} options.color - The color for the event.
 * @param {FormData} formData - FormData containing title and start.
 * @param {string} licenseKey - The license key for authentication.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
exports.scheduleAppointment = async (event, licenseKey) => {
  try {
    const licenseDetails = await getCache(licenseKey);
    const supabaseUrl = licenseDetails?.supabaseUrl;
    const supabaseKey = licenseDetails?.supabaseKey;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Invalid license details");
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.from("appointment").insert([event]);
    if (error) throw new Error("Database error: " + error.message);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
};
