const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const ExpressEjsLayouts = require("express-ejs-layouts");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
// const io = new Server(server);
const port = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = require("./config/mongoose.config");
connectDB();

// Import Routes
const { AllRoutes } = require("./routes/router");
const { initialSocket } = require("./utils/initSocket");
const { socketHandler } = require("./socket.io");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(ExpressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", "resource/views");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("layout", "./layouts/master");
app.use( "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(
    swaggerJsDoc({
      swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "REAL TIME CHAT APPLICATION",
          version: "2.0.0",
          description: "real time chat application with socket.io",
          contact: {
            name: "Arman DA",
            url: "https://freerealapi.com",
            email: "arman7da.co@gmail.com",
          },
        },
        servers: [
          {
            url: "http://localhost:5000",
          },
        ],
        components : {
          securitySchemes : {
            BearerAuth : {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
              
            }
          }
        },
        security : [{BearerAuth : [] }]
      },
      apis: ["./routes/**/*.js"],
    }),
    {explorer: true},
  ))

// Use Routes
app.use(AllRoutes);

// Start Server
const io = initialSocket(server);
socketHandler(io);
server.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
