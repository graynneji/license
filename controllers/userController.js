const userServices = require("../services/userService");

/**
 * Controller to get user details.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.getUsersController = async (req, res) => {
  try {
    const { userId, licenseKey } = req.params;
    const result = await userServices.handleGetUser(userId, licenseKey);

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json({ data: result.data });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
};

/**
 * Controller to get therapist info.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.getTherapistInfoController = async (req, res) => {
  try {
    const { userId, licenseKey, desgn } = req.params;
    const result = await userServices.handleGetTherapistInfo(
      userId,
      licenseKey,
      desgn
    );
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json({ data: result.data, desgn: result.desgn });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
};

/**
 * Controller to get appointments for a patient with a therapist.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.getAppointmentsController = async (req, res) => {
  try {
    const { patientId, therapistId, licenseKey } = req.params;
    const result = await userServices.handleGetAppointments(
      patientId,
      therapistId,
      licenseKey
    );

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json({ data: result.data });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
};

/**
 * Controller to get questionaire for a patient.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.getQuestionaireController = async (req, res) => {
  try {
    const { patientId, licenseKey } = req.params;
    const result = await userServices.handleGetQuestionaire(
      patientId,
      licenseKey
    );

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json({ data: result.data });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
};

/**
 * Controller to update patient notes using formData.
 * Consumes multipart/form-data (use multer or similar middleware in Express).
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.updateViewNotesController = async (req, res) => {
  try {
    const { patientId, licenseKey } = req.body;
    // Assuming formData is available as req.formData (setup by middleware)
    const formData = req.formData || req.body; // Adjust as needed based on middleware!
    const result = await userServices.handleUpdateViewNotes(
      patientId,
      formData,
      licenseKey
    );

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json({ data: result.data });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
};

/**
 * Controller to get patient notes.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.getNoteController = async (req, res) => {
  try {
    const { patientId, licenseKey } = req.params;
    const result = await userServices.handleGetNote(patientId, licenseKey);

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json({ data: result.data });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
};

/**
 * Controller to get all patients attached to a therapist.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.getAllPatientsAttachedToTherapistController = async (req, res) => {
  try {
    const { userId, licenseKey, desgn } = req.params;
    const result = await userServices.handleGetAllPatientsAttachedToTherapist(
      userId,
      licenseKey,
      desgn
    );

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json({ data: result.data });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
};

/**
 * Controller to create/schedule an appointment for a patient and therapist.
 * Consumes multipart/form-data (use multer or similar middleware in Express).
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.createAppointmentController = async (req, res) => {
  try {
    const { userId, therapistId, color, licenseKey } = req.body;
    // Assuming formData is available as req.formData (setup by middleware)
    const formData = req.formData || req.body; // Adjust as needed based on middleware!
    const result = await userServices.handleCreateAppointment(
      { userId, therapistId, color },
      formData,
      licenseKey
    );

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json({ data: result.data });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
};
