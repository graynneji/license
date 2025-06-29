const { createClient } = require("@supabase/supabase-js");
const { getCache } = require("../utils/cache");

/**
 * Handles fetching user details for a given userId and licenseKey.
 * @param {string} userId
 * @param {string} licenseKey
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
exports.handleGetUser = async (userId, licenseKey) => {
  try {
    const licenseDetails = await getCache(licenseKey);
    const supabaseUrl = licenseDetails?.supabaseUrl;
    const supabaseKey = licenseDetails?.supabaseKey;
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Invalid license details");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("user")
      .select(
        "user_id, name, therapist_id, therapist(name, therapist_id, authority, license, specialization, summary), patients(*)"
      )
      .eq("user_id", userId);

    if (error) {
      throw new Error("Database error: " + error.message);
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || error };
  }
};

/**
 * Handles fetching therapist info for a given license key and userId.
 * @param {string} userId
 * @param {string} licenseKey
 * @param {string} desgn
 * @returns {Promise<{success: boolean, data?: any, error?: string, desgn?: string}>}
 */
exports.handleGetTherapistInfo = async (userId, licenseKey, desgn) => {
  try {
    const licenseDetails = await getCache(licenseKey);
    const supabaseUrl = licenseDetails?.supabaseUrl;
    const supabaseKey = licenseDetails?.supabaseKey;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Invalid license details");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: therapistData, error: therapistError } = await supabase
      .from("therapist")
      .select("id, balance, pending, total_earning")
      .eq("therapist_id", userId);

    if (therapistError) {
      throw new Error("Database error: " + therapistError.message);
    }
    return { success: true, data: therapistData, desgn };
  } catch (error) {
    return { success: false, error: error.message || error };
  }
};

/**
 * Handles fetching appointments for a patient and therapist.
 * @param {string} patientId
 * @param {string} therapistId
 * @param {string} licenseKey
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
exports.handleGetAppointments = async (patientId, therapistId, licenseKey) => {
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
      .match({ patient_id: patientId, therapist_id: therapistId });

    if (error) {
      throw new Error("Database error: " + error.message);
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || error };
  }
};

/**
 * Handles fetching questionaire for a patient.
 * @param {string} patientId
 * @param {string} licenseKey
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
exports.handleGetQuestionaire = async (patientId, licenseKey) => {
  try {
    const licenseDetails = await getCache(licenseKey);
    const supabaseUrl = licenseDetails?.supabaseUrl;
    const supabaseKey = licenseDetails?.supabaseKey;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Invalid license details");
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: questionaire, error } = await supabase
      .from("patients")
      .select("selected")
      .eq("patient_id", patientId);

    if (error) {
      throw new Error("Database error: " + error.message);
    }
    return { success: true, data: questionaire };
  } catch (error) {
    return { success: false, error: error.message || error };
  }
};

/**
 * Handles updating notes for a patient using formData.
 * @param {string} patientId
 * @param {FormData} formData
 * @param {string} licenseKey
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
exports.handleUpdateViewNotes = async (patientId, formData, licenseKey) => {
  try {
    const note = formData.get("note");
    const color = formData.get("color");

    const licenseDetails = await getCache(licenseKey);
    const supabaseUrl = licenseDetails?.supabaseUrl;
    const supabaseKey = licenseDetails?.supabaseKey;
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Invalid license details");
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: patientData, error } = await supabase
      .from("patients")
      .select("notes")
      .eq("patient_id", patientId)
      .single();

    if (error) {
      throw new Error("Could not add note");
    }

    const patientNotes = patientData?.notes ?? [];

    const newNote = {
      id: Date.now(),
      text: note,
      color: color,
      timestamp: new Date().toISOString(),
    };

    const newNotes = [...patientNotes, newNote];

    const { data, error: updateNotesError } = await supabase
      .from("patients")
      .update({ notes: newNotes })
      .eq("patient_id", patientId)
      .select();

    if (updateNotesError) {
      throw new Error("Database error: " + updateNotesError.message);
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || error };
  }
};

/**
 * Handles fetching notes for a patient.
 * @param {string} patientId
 * @param {string} licenseKey
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
exports.handleGetNote = async (patientId, licenseKey) => {
  try {
    const licenseDetails = await getCache(licenseKey);
    const supabaseUrl = licenseDetails?.supabaseUrl;
    const supabaseKey = licenseDetails?.supabaseKey;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Invalid license details");
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: notes, error } = await supabase
      .from("patients")
      .select("notes")
      .eq("patient_id", patientId)
      .single();

    if (error) {
      throw new Error("Database error: " + error.message);
    }
    return { success: true, data: notes };
  } catch (error) {
    return { success: false, error: error.message || error };
  }
};

/**
 * Handles fetching all patients attached to a therapist by therapist info.
 * @param {string} userId
 * @param {string} licenseKey
 * @param {string} desgn
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
exports.handleGetAllPatientsAttachedToTherapist = async (
  userId,
  licenseKey,
  desgn
) => {
  try {
    // Reuse therapist info service
    const therapistInfo = await exports.handleGetTherapistInfo(
      userId,
      licenseKey,
      desgn
    );
    if (!therapistInfo.success) {
      throw new Error(therapistInfo.error);
    }
    if (therapistInfo.desgn === "patient") {
      return { success: false, error: "User is a patient, not a therapist." };
    }

    const licenseDetails = await getCache(licenseKey);
    const supabaseUrl = licenseDetails?.supabaseUrl;
    const supabaseKey = licenseDetails?.supabaseKey;
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Invalid license details");
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: patientsTherapist, error } = await supabase
      .from("patients")
      .select(
        "id, name, therapist, patient_id, appointment, is_subscribed, subscription"
      )
      .eq("therapist", therapistInfo.data[0]?.id);

    if (error) {
      throw new Error("Database error: " + error.message);
    }

    return { success: true, data: patientsTherapist };
  } catch (error) {
    return { success: false, error: error.message || error };
  }
};

/**
 * Handles scheduling an appointment for a patient and therapist from formData.
 * @param {object} params - { userId, therapistId, color }
 * @param {FormData} formData
 * @param {string} licenseKey
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
exports.handleCreateAppointment = async (
  { userId, therapistId, color },
  formData,
  licenseKey
) => {
  try {
    const title = formData.get("title");
    const start = formData.get("start");

    const licenseDetails = await getCache(licenseKey);
    const supabaseUrl = licenseDetails?.supabaseUrl;
    const supabaseKey = licenseDetails?.supabaseKey;
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Invalid license details");
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    const event = {
      title,
      start,
      backgroundColor: color,
      borderColor: color,
      patient_id: userId,
      therapist_id: therapistId,
    };

    const { data, error } = await supabase.from("appointment").insert([event]);
    if (error) {
      throw new Error("Database error: " + error.message);
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || error };
  }
};
