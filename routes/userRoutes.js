const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/**
 * POST /user - Get user details
 */
router.post("/", userController.getUsersController);

/**
 * POST /user/therapist/info - Get therapist info
 */
router.post("/therapist/info", userController.getTherapistInfoController);

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
 * POST /user/therapist/patients - Get all patients attached to a therapist
 */
router.post(
  "/therapist/patients",
  userController.getAllPatientsAttachedToTherapistController
);

/**
 * POST /user/appointments/create - Schedule an appointment (formData)
 */
router.post("/appointments/create", userController.createAppointmentController);

module.exports = router;
