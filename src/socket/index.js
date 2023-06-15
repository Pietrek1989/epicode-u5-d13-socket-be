let onlineUsers = [];

export const newConnectionHandler = (socket) => {
  console.log("A new client connected! The socket id is:", socket.id);
  socket.emit("welcome", { message: `HELLO IN TO THE WORLD ${socket.id}` });

  socket.on("setUsername", (payload) => {
    console.log(payload);
    onlineUsers.push({ username: payload.username, socketId: socket.id });
    socket.emit("loggedIn", onlineUsers);
    socket.broadcast.emit("updateOnlineUsersList", onlineUsers);
  });

  socket.on("sendMessage", (message) => {
    socket.broadcast.emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    socket.broadcast.emit("updateOnlineUsersList", onlineUsers);
  });
};
