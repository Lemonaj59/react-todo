let express = require("express");
let router = express.Router();
const client = require("../db");

router.use(function async(req, res, next) {
  next();
});

router.route("/").post(async (req, res, next) => {
  const userInput = await req.body;
  const password = userInput.password;

  let text = `SELECT username, auths_id FROM auths WHERE user_password = $1`;
  let value = [password];
  let userInfo = await client.query(text, value);

  if (userInfo.rows[0] === undefined) {
    await res.json({ sucess: false });
  } else {
    let response = {
      sucess: userInfo.rows[0]["username"] === userInput.username,
      userId: userInfo.rows[0]["auths_id"],
    };
    if (userInfo.rows[0]["username"] === userInput.username) {
      req.session.user = {
        userId: userInfo.rows[0]["auths_id"],
        username: userInput.username,
      };
    }
    await res.json(response);
  }
});

module.exports = router;
