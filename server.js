const { name } = require("ejs");
const express = require("express");
const app = express()
app.set("view engine", "ejs");
app.set("views", "./views");
const port = 4000;
const axios = require("axios");

const userRouter = require("./routers/users");
app.use("/users", userRouter);

app.get("/", async (req, res) => {
  try {
    const response = await
axios.get('https://jsonplaceholder.typicode.com/posts');
    res.render('index', {posts: response.data});
  } catch (error) {
    res.status(500).send('Error fectching data');
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
