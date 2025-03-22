const { name } = require("ejs");
const express = require("express");
const app = express()
app.set("view engine", "ejs");
app.set("views", "./views");
const port = 4000;

const userRouter = require("./routers/users");
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.redirect("/users");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
