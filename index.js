const express = require("express");
const todosRouter = require("./src/routers/todo");
const usersRouter = require("./src/routers/user");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
const port = process.env.PORT;
require("./src/db/db");

const app = express();

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.ORIGIN
  })
);
app.use(express.json());
app.use("/todos", todosRouter);
app.use("/users", usersRouter);
app.use("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
