const socket = require("socket.io");
function initialSocket(httpServer) {
  const io = socket(httpServer, {
    cors: {
      origin: "*",
    },
  });
  return io;
}

module.exports = { initialSocket };