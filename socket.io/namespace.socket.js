// module.exports = class NamespaceSocketHandler {
//     #io;
//     constructor(io) {
//         this.#io = io;
//     }

//     initConnection() {
//         this.#io.on("connection", socket => {
//             console.log(socket.rooms);
//         });
//     }
// }
module.exports = class NamespaceSocketHandler {
    #io;
    constructor(io) {
      this.#io = io;
    }
  
    initConnection() {
      this.#io.on("connection", (socket) => {
        console.log("✅ Client Connected: ", socket.id); // Log when a client connects
        console.log("🛠 Rooms:", socket.rooms); // Log rooms
      });
    }
  };
  