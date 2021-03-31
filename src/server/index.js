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

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "193248965975-lm5drb0mkrhepcipvomamrjamgcfopkq.apps.googleusercontent.com"
);

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

// server.post("/api/v1/auth/google", async (req, res) => {
//   const { token } = req.body;
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience:
//       "193248965975-lm5drb0mkrhepcipvomamrjamgcfopkq.apps.googleusercontent.com",
//   });
//   const { name, email, picture } = ticket.getPayload();
//   const user = await db.user.upsert({
//     where: { email: email },
//     update: { name, picture },
//     create: { name, email, picture },
//   });
//   req.session.userId = user.id;
//   res.status(201);
//   res.json(user);
// });
