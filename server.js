const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

const port = 4000;

app.use(express.json()); // middleware

const users = [
  { id: 1, name: "Richard Majos" },
  { id: 2, name: "Jaypi Yazimerz" },
  { id: 3, name: "Mark Escober" },
];

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.post("/users", (req, res) => {
  const newUser = {
    id: req.body.id,
    name: req.body.name,
  }

  users.push(newUser);

  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    user.id = req.body.id,
    user.name = req.body.name;
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.send("User deleted");
  } else {
    res.status(404).send("User not found");
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



