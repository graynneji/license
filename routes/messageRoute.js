const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

/**
 * POST /messages/send - Send messages for a user (as sender or receiver)
 */
router.post("/send", messageController.sendMessage);

/**
 * POST /messages - Get messages for a user (as sender or receiver)
 */
router.get("/", messageController.getMessagesController);

/**
 * GET /messages/pair - Get last N messages between two users
 * Query params: userId, receiverId, limit (optional, default 30)
 */
router.get("/pair", messageController.getUserPairMessagesController);

module.exports = router;
