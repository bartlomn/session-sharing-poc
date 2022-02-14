const express = require("express");
const cookieSession = require("cookie-session");

const app = express();
const port = 3000;

app.set("trust proxy", 1); // trust first proxy

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 1000 * 10, //expire after 10 sec
  })
);

app.get("/", (req, res) => {
  // Update views
  req.session.views = (req.session.views || 0) + 1;
  res.send("Hello World from app <b>1</b>!,<br/>Views: " + req.session.views);
});

app.listen(port, () => {
  console.log(`App 1 listening on port ${port}`);
});
