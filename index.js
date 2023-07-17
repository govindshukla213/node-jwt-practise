const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
// app.use(express.urlencoded({
//     extended: false
// }))
app.use(express.json());
//app.use(express.text());

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Hello Api",
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  const body = req.body;
  console.log(body);
  jwt.verify(req.token, "secret_key", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    }
    res.json({
      message: "Post Api",
      body,
      authData,
    });
  });
});

app.post("/api/login", (req, res) => {
  //  Mock User
  const User = {
    id: 1,
    username: "Govind",
    email: "govind@gmail.com",
  };
  jwt.sign({ user: User }, "secret_key", { expiresIn: "50s" }, (err, token) => {
    res.json({
      token: token,
    });
  });
});
//  Format of Token
// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
  //  Get Auth Header Value
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    res.sendStatus(403);
  }
  const bearertoken = bearerHeader.split(" ")[1];
  req.token = bearertoken;

  next();
}

app.listen(5000, () => {
  console.log("server is listening");
});
