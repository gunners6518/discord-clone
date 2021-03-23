const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

const PORT = 3001;

//connectionが繋がったらsocketイベントを登録
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("simple-chat", (msg) => {
    console.log("Message Received and Broadcasting : " + JSON.stringify(msg));
    io.emit("simple-chat", msg);
  });
});

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
