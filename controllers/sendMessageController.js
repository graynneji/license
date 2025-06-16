const sendMessageSchema = require("../validations/sendMessageSchema");
const sendMessageService = require("../services/sendMessageService");

exports.sendMessage = async (req, res) => {
  try {
    // Validate input using Yup
    await sendMessageSchema.validate(req.body, { abortEarly: false });
    const { senderId, recieverId, message, licenseKey } = req.body;

    const { data, error } = await sendMessageService.handleSendMessage(
      senderId,
      recieverId,
      message,
      licenseKey
    );

    if (error) {
      return res
        .status(401)
        .json({
          error: "Message was not sent",
          details: error.message || error,
        });
    }

    return res.status(201).json({ data });
  } catch (error) {
    // Handle Yup validation errors and other exceptions
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors,
      });
    }
    return res.status(500).json({
      error: "Internal server error",
      details: error.message || error,
    });
  }
};
