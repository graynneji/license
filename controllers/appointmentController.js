import appointmentService from "../services/appointmentService";

/**
 * Controller to get appointments for a patient and therapist.
 * @param req - Express request.
 * @param res - Express response.
 */
export const getAppointmentsController = async (req, res) => {
  try {
    const { patientId, therapistId } = req.query;
    const licenseKey = req.headers["soullve-license-key"];
    const result = await appointmentService.getAppointments(
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
 * Controller to schedule a new appointment.
 * @param req - Express request.
 * @param res - Express response.
 */
export const scheduleAppointmentController = async (req, res) => {
  try {
    const { userId, therapistId, color } = req.body;
    const formData = req.body.formData; // Assuming formData is passed and parsed correctly

    const result = await appointmentService.scheduleAppointment(
      { userId, therapistId, color },
      formData
    );

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json({ data: result.data });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
};
