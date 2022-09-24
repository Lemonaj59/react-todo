let express = require("express");
let router = express.Router();
const client = require("../db");

router.use(function async(req, res, next) {
  next();
});

router
  .route("/")
  .post(async (req, res) => {
    const newUser = req.body;

    let text = `SELECT username FROM public.auths WHERE username = $1`;
    let values = [newUser.username];

    let haveUser = await client.query(text, values);

    let rows = haveUser.rows.length;
    let isTaken = rows === 1;
    return res.json({ userTaken: isTaken });
  })
  .put(async (req, res) => {
    const newUser = req.body;
    let username = newUser.username;
    let password = newUser.password;

    let values = [username, password];
    let text = `INSERT INTO public.auths VALUES(DEFAULT, $1, $2)`;

    await client.query(text, values);
  });

module.exports = router;
