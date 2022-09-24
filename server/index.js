const express = require("express");
const client = require("./db");
const app = express();
const cors = require("cors");
const todolist = require("./routes/todoList");
const lists = require("./routes/listTodolist");
const users = require("./routes/users");
const createUser = require("./routes/createUser");
const loggedInStatus = require("./routes/loggedInStatus");
let session = require("express-session");
pgSession = require("connect-pg-simple")(session);


const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new pgSession({
      pool: client,
      tableName: "session",
    }),
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: true,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(function (req, res, next) {
  req.session;

  next();
});

app.use("/todo", todolist);

app.use("/lists", lists);

app.use("/user", users);

app.use("/createUser", createUser);
app.use("/loggedInStatus", loggedInStatus);

app.listen(port, (err) =>
  console.log(`listening on port ${port}`)
);
