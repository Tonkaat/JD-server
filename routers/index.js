const express = require("express");
const axios = require("axios");
const router = express.Router();

// Render Pokemon Homepage
router.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=30");
        res.render("index", { pokemons: response.data.results });
    } catch (error) {
        res.status(500).send("Error fetching Pokémon data.");
    }
});

// Render Pokemon Details Page
router.get("/pokemon/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const pokemonRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

        res.render("details", {
            pokemon: pokemonRes.data,
            description: speciesRes.data.flavor_text_entries.find(entry => entry.language.name === "en")?.flavor_text || "No description available."
        });
    } catch (error) {
        res.status(500).send("Error fetching Pokémon details.");
    }
});

module.exports = router;
