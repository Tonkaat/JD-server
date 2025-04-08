const express = require("express");
const app = express();
const PORT = 4000;

// Import Routes
const pokemonRoutes = require("./routers");

app.set("view engine", "ejs");
app.use(express.static("public"));

// Use the API Routes
app.use("/", pokemonRoutes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
