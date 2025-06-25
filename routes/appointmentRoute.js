const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

/**
 * GET /appointments - Get appointments for a patient and therapist
 * Query params: patientId, therapistId
 */
router.get("/", appointmentController.getAppointmentsController);

/**
 * POST /appointments - Schedule a new appointment
 * Body: { userId, therapistId, color, formData }
 */
router.post("/", appointmentController.scheduleAppointmentController);

export default router;
