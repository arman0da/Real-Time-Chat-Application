const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const ExpressEjsLayouts = require("express-ejs-layouts");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = require("./config/mongoose.config");
connectDB();

// Import Routes
const { AllRoutes } = require("./routes/router");

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(ExpressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", "resource/views");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("layout", "./layouts/master");

// Use Routes
app.use(AllRoutes);

// Start Server
server.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
