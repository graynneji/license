import { createClient } from "@supabase/supabase-js";
import { getCache } from "../utils/cache";

/**
 * Fetches appointments for a patient and therapist.
 * @param patientId - The patient's unique ID.
 * @param therapistId - The therapist's unique ID.
 * @returns Promise containing appointments data or error info.
 */
export async function getAppointments(patientId, therapistId, licenseKey) {
  try {
    const licenseDetails = getCache(licenseKey);
    const supabaseUrl = licenseDetails?.supabaseUrl;
    const supabaseKey = licenseDetails?.supabaseKey;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Invalid license details");
    }
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("appointment")
      .select("id, title, start, backgroundColor, borderColor")
      .match({ patient_id: patientId, therapist_id: therapistId });

    if (error) throw new Error("Database error: " + error.message);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Schedules a new appointment for a user with a therapist.
 * @param options - Includes userId, therapistId, and color for event.
 * @param formData - FormData containing title and start.
 * @returns Promise containing insert result or error info.
 */
export async function scheduleAppointment(options, formData) {
  try {
    const licenseDetails = getCache(licenseKey);
    const supabaseUrl = licenseDetails?.supabaseUrl;
    const supabaseKey = licenseDetails?.supabaseKey;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Invalid license details");
    }
    const supabase = createClient(supabaseUrl, supabaseKey);
    const title = formData.get("title");
    const start = formData.get("start");
    const event = {
      title,
      start,
      backgroundColor: options.color,
      borderColor: options.color,
      patient_id: options.userId,
      therapist_id: options.therapistId,
    };
    const { data, error } = await supabase.from("appointment").insert([event]);
    if (error) throw new Error("Database error: " + error.message);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
}
