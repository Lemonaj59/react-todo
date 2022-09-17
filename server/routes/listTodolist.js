const express = require("express");
let router = express.Router();
const client = require("../db");

const rowName = {
  item: "todos",
  item_description: "details",
  duration: "time",
  done: "done",
  list_item_id: "id",
  list_id: "todoId",
};

async function typeOfList(arg) {
  let type = arg;

  if (type === "timed") {
    return ["item", "item_description", "duration", "done", "list_item_id"];
  } else if (type === "not timed") {
    return ["item", "item_description", "done", "list_item_id"];
  } else if (type === "not timed no description") {
    return ["item", "list_item_id"];
  } else {
    return ["item", "duration", "done", "list_item_id"];
  }
}

function getKey(type) {
  return Object.keys(rowName).find((key) => rowName[key] === type);
}

async function keysWorded() {
  return await item.map((item) => {
    return Object.keys(item);
  });
}

router.use(function async(req, res, next) {
  next();
});

router
  .route("/")
  .get(async (req, res) => {})
  .post(async (req, res) => {
    todoID = await req.body;

    let values = await typeOfList(todoID.type);
    let id = [todoID.name];

    let text = `SELECT ${values.join(
      ", "
    )}, list_item_id FROM list_items WHERE list_id = $1`;
    let items = await client.query(text, id);

    let rowNames = values.map((row) => rowName[row]);

    let todoItems = items.rows.map((row) => {
      return Object.keys(row).map((option) => {
        return row[option];
      });
    });

    await res.json({ items: todoItems, rowNames: rowNames, type: todoID.type });
  })
  .put(async (req, res) => {
    let item = await req.body;
    let options = Object.keys(item);
    const sqlOptions = options.map((option) => getKey(option).toString());
    let values = Object.values(item);
    let newValues = [values[0], values[1], values[2], false, values[4]];

    let text = `INSERT INTO list_items (${sqlOptions}) VALUES ($1, $2, $3, $4, $5)`;

    await client.query(text, newValues);
    res.json(true);
  })
  .patch(async (req, res) => {
    const listItem = await req.body;
    let type = listItem.type;
    let item = listItem.item;
    let id = listItem.id;
    const sqlType = getKey(type).toString();

    let values = [item, id];
    let text = `UPDATE list_items SET ${sqlType} = $1 WHERE list_item_id = $2`;

    await client.query(text, values);
    res.json(true);
  })
  .delete(async (req, res) => {
    let item = await req.body;
    let values = [];
    values.push(Object.keys(item).toString());
    values.push(Number(Object.values(item)));

    values = [values[1]];

    let text = "DELETE FROM list_items WHERE list_item_id = $1";
    client.query(text, values);
    res.json(true);
  });

module.exports = router;
