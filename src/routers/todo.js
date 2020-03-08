const express = require("express");
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");
const getTokenData = require("../util/token");
const mongoose = require("mongoose");

const router = express.Router();

// global
const getTodos = async user_id => {
  try {
    return await Todo.find({ user_id });
  } catch (error) {
    throw error;
  }
};

// routes

router.post("/", auth, async (req, res) => {
  // Create a new user
  try {
    const { token_result } = getTokenData(req);
    await Todo.create({
      ...req.body,
      user_id: token_result._id
    });

    res.send({ success: true, data: await getTodos(token_result._id) });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.put("/:id", auth, async (req, res) => {
  //Login a registered user
  try {
    const { token_result } = getTokenData(req);

    let update_body = {
      ...req.body,
      updated_at: Date.now()
    };

    if (req.body.is_completed) {
      updated_body.finished_at = Date.now();
    }
    
    const updateResult = await Todo.updateOne(
      { _id: req.params.id },
      update_body
    );
    res.send(
      updateResult.ok
        ? { success: true, data: await getTodos(token_result._id) }
        : { success: false, data: "We couldn't find this todo" }
    );
  } catch (error) {
    console.error(error);
    res.status(400).send(JSON.stringify(error));
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { token_result } = getTokenData(req);
    const deleteResult = await Todo.deleteOne({ _id: req.params.id });
    res.send(
      deleteResult.ok
        ? { success: true, data: await getTodos(token_result._id) }
        : {
            status: false,
            data: null
          }
    );
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { token_result } = getTokenData(req);
    res.send({ success: true, data: await getTodos(token_result._id) });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
