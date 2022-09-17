let express = require("express");
let router = express.Router();
const client = require("../db");

router.use(function async(req, res, next) {
  console.log("i made it");
  next();
});

router
  .route("/:id")
  .get(async (req, res) => {
    let userId = req.params.id;

    let allTodos = await client.query(
      `SELECT list_name, list_id, list_type FROM lists WHERE user_id = ${userId}`
    );
    let todoNames = allTodos.rows.map((item) => {
      return { item: item.list_name, id: item.list_id, type: item.list_type };
    });

    res.json(todoNames);
  })
  .post(async (req, res, next) => {
    const todoID = await req.body;
    let name = [todoID.todoList];
    let nameID = await client.query(
      `SELECT list_id FROM lists WHERE list_name = $1`,
      name
    );
    nameID = nameID.rows[0];
    todoID.todoList = nameID.list_id;
    res.json(todoID);
  })
  .put(async (req, res, next) => {
    const changeType = {
      "basic list": "not timed no description",
      "timed only": "timed no description",
      "description only": "not timed",
      "description and timed": "timed",
    };

    const newItem = await req.body;
    let tittle = await newItem.title;
    let type = await changeType[newItem["type"]];
    let id = req.params.id;
    let queryText = "INSERT INTO lists VALUES(DEFAULT, $1, $2, $3)";
    let queryValues = [id, tittle, type];

    try {
      await client.query(queryText, queryValues);
    } catch {
      console.log("please select todo list type");
    }

    res.sendStatus(200);
  })
  .delete(async (req, res, next) => {
    const listId = await req.body.listId;
    const userId = await req.params.id;

    let queryValues = [listId, userId];
    let queryText = "DELETE FROM lists WHERE list_id = $1 AND user_id = $2";

    await client.query(queryText, queryValues);

    res.sendStatus(200);
  })
  .patch(async (req, res, next) => {
    const listId = await req.body.listId;
    const newName = await req.body.newName;
    const userId = await req.params.id;

    let queryValues = [listId, newName, userId];
    let queryText =
      "UPDATE lists SET list_name = $2 WHERE list_id = $1 AND user_id = $3";
    await client.query(queryText, queryValues);

    res.sendStatus(200);
  });

module.exports = router;
