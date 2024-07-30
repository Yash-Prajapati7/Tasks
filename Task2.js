// Import required modules
import express from 'express';
import axios from 'axios';
import 'dotenv/config'

// Create an instance of Express
const app = express();

// Home Route
app.get('/', (req, res) => {
    res.send('Hello Harry Potter fans!');
})

// Route to get all characters
app.get('/api/characters', async (req, res) => {
    try {
        const response = await axios.get('https://hp-api.onrender.com/api/characters');
        const characters = response.data;

        // Extract character names
        const characterNames = characters.map(character => character.name);

        // Send the extracted names as the response
        res.status(200).json(characterNames);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch characters' });
    }
});

// Route to get all spells
app.get('/api/spells', async (req, res) => {
    try {
        const response = await axios.get('https://hp-api.onrender.com/api/spells');
        const spells = response.data.map( (spell) => {
            return {
                name : spell.name,
                description : spell.description
            }
        })
        res.status(200).json(spells);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch spells' });
    }
});

// Route to get all Hogwarts staff
app.get('/api/staff', async (req, res) => {
    try {
        const response = await axios.get('https://hp-api.onrender.com/api/staff');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch staff' });
    }
});

// Route to get all Hogwarts students
app.get('/api/students', async (req, res) => {
    try {
        const response = await axios.get('https://hp-api.onrender.com/api/students');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// Route to get character by
app.get('/api/character/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://hp-api.onrender.com/api/character/${id}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch character details' });
    }
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
    console.log(process.env.PORT);
});
