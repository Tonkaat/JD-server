const express = require("express");
const router =  express.Router();

const users = [
    { id: 1, name: "Richard Majos", age: 24, bio: "Loves coding!" },
    { id: 2, name: "Nikko Eroy", age: 30, bio: "Passionate about UI/UX!" },
    { id: 3, name: "Mark Escober", age: 45, bio: "Backend enthusiast!" },
    { id: 4, name: "John Wayne Dajao", age: 69, bio: "UwU" },
  ];
  
  // Route to display all users as a list with links
  router.get("/", (req, res) => {
    res.render("userz", { users }); // Renders 'views/users.ejs'
  });
  
  // Route to display a specific user's details
  router.get("/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("profile", { user }); // Renders 'views/user.ejs'
});



module.exports = router