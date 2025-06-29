const app = require("../server"); // Import your Express app
const serverless = require("serverless-http"); // Converts Express to serverless

module.exports = serverless(app);
