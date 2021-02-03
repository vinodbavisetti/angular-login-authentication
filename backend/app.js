const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { runInNewContext } = require("vm");
const { domainToUnicode } = require("url");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/login", (req, res, next) => {
  if (req.body.email && req.body.password) {
    let email = req.body.email;
    let token = jwt.sign(
      {
        email: email,
      },
      "myprivatekey",
      { expiresIn: "1h" }
    );
    res.json({ token: token, email: email });
  } else {
    res.status(401).json({ error: "not authorized" });
  }
});

app.get("/api/verifytoken", auth, (req, res) => {
  res.json({ msg: "success, authenticated" });
});

app.get("/api/getdata", auth, (req, res) => {
  res.json([
    { name: "milk", quantity: 2 },
    { name: "sugar", quantity: 3 },
    { name: "bread", quantity: 5 },
  ]);
});

app.listen(3000, () => {
  console.log("backend listening at port 3000");
});

function auth(req, res, next) {
  let token = req.get("Authorization");
  // console.log(token);
  let decodedToken;
  if (token) {
    try {
      decodedToken = jwt.verify(token, "myprivatekey");
    } catch (err) {
      return res.status(500).json({ error: "server error" });
    }
  }
  if (!decodedToken) {
    res.status(401).json({ error: "not authenticated" });
  } else {
    next();
  }
}
