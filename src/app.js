const express = require("express");
const todosRouter = require("./routers/todo");
const usersRouter = require("./routers/user");

const port = process.env.PORT;
require("./db/db");

const app = express();

app.use(express.json());
app.use("/todos", todosRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
