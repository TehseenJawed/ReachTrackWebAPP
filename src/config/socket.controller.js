import io from "socket.io-client";
const SocketController = {
  connect(ENDPOINT, option) {
    try {
      const socket = io(ENDPOINT, option);
      console.log("CONNECTED!", socket);
      return socket;
    } catch (error) {
      console.log(error);
    }
  },
  connection(socket) {
    socket.on("connect", () => {
      console.log(socket.connected, "<<<<<================");
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
  },
  disconnect(socket) {
    socket.on("disconnect", () => {
      socket.disconnect();
      console.log("DISCONNECTED!");
    });
  },
  subscribe(socket, id) {
    console.log(id, "IDDDDD");
    socket.emit("subscribe", id);
  },
  sendMessage(socket, payload, cb) {
    socket.emit("send-message", payload);
    cb();
  },
  receiveMessage(socket, payload, cb) {
    socket.emit("recieve-message", payload);
    cb();
  },
  readMessages(socket, payload) {
    socket.emit('message-seen', payload);
  },
};
export default SocketController;