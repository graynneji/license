const appointmentService = require("../services/appointmentService");

/**
 * Controller to get appointments for a patient and therapist.
 * @param req - Express request.
 * @param res - Express response.
 */
exports.getAppointmentsController = async (req, res) => {
  try {
    const { userId, therapistId } = req.query;
    const licenseKey = req.headers["soullve-license-key"];
    const result = await appointmentService.getAppointments(
      userId,
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
 * Controller to schedule a new appointment.
 * @param req - Express request.
 * @param res - Express response.
 */
exports.scheduleAppointmentController = async (req, res) => {
  try {
    // const { title,
    // start,
    // backgroundColor,
    // borderColor,
    // patient_id,
    // therapist_id } = req.body;
    const licenseKey = req.headers["soullve-license-key"];
    const result = await appointmentService.scheduleAppointment(
      req.body,
      licenseKey
    );

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json({ data: result.data });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
};
