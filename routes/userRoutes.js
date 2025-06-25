const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/**
 * GET /user - Get user details
 */
router.get("/", userController.getUsersController);

/**
 * GET /user/therapist/info - Get therapist info
 */
router.get("/therapist/info", userController.getTherapistInfoController);

/**
 * POST /user/appointments - Get appointments for a patient and therapist
 */
router.post("/appointments", userController.getAppointmentsController);

/**
 * POST /user/questionaire - Get questionaire for a patient
 */
router.post("/questionaire", userController.getQuestionaireController);

/**
 * POST /user/note/update - Update patient notes (formData)
 */
router.post("/note/update", userController.updateViewNotesController);

/**
 * POST /user/note - Get notes for a patient
 */
router.post("/note", userController.getNoteController);

/**
 * GET /user/therapist/patients - Get all patients attached to a therapist
 */
router.get(
  "/therapist/patients",
  userController.getAllPatientsAttachedToTherapistController
);

/**
 * POST /user/appointments/create - Schedule an appointment (formData)
 */
router.post("/appointments/create", userController.createAppointmentController);

module.exports = router;
