const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true }));
app.use(express.static("public"));

const port = 4000;

app.use(express.json()); // middleware  

let users = [
  { id: 1, name: "Richard Majos", email: "richard@gmail.com" },
  { id: 2, name: "Jaypi Yazimerz", email: "jaypi@gmail.com" },
  { id: 3, name: "Mark Escober", email: "mark@gmail.com" },
];

app.get("/users", (req, res) => {
  res.render("index", { users });
});

app.get("/users/new", (req, res) => {
  res.render("new");
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: Date.now(), name, email};

  users.push(newUser);
  res.redirect("/users");
});

app.get("/users/:id/edit", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  res.render("edit", { user });
});

app.post("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const user = users.find((u) => u.id == req.params.id);
  if (user) {
    user.name = name;
    user.email = email;
  }
  res.redirect("/users");
});

app.post("/users/:id/delete", (req, res) => {
  users = users.filter((u) => u.id != req.params.id);
  res.redirect("/users");
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



