const messageSchema = require("../validations/messageSchema");
const messageService = require("../services/messageService");

exports.sendMessage = async (req, res) => {
  try {
    // Validate input using Yup
    const { senderId, receiverId, message } = req.body;
    await messageSchema.validate({ message }, { abortEarly: false });
    const licenseKey = req.headers["soullve-license-key"];
    const { data, error } = await messageService.handleSendMessage(
      senderId,
      receiverId,
      message,
      licenseKey
    );

    if (error) {
      return res.status(401).json({
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

/**
 * Controller to get messages for a user (as sender or receiver).
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.getMessagesController = async (req, res) => {
  try {
    const { userId } = req.query;
    const licenseKey = req.headers["soullve-license-key"];
    const result = await messageService.handleGetMessages(userId, licenseKey);

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json({ data: result.data });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
};

/**
 * Controller to get the last N messages exchanged between two users.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.getUserPairMessagesController = async (req, res) => {
  try {
    const { userId, receiverId } = req.query;
    const licenseKey = req.headers["soullve-license-key"];
    const N = parseInt(req.query.limit, 10) || 30; // Default to 30

    const result = await messageService.handleGetUserPairMessages(
      userId,
      receiverId,
      N,
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
