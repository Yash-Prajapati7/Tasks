import express from 'express';
import mongoose from 'mongoose';
import Student from './student.model.js';

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hogwarts', { useNewUrlParser: true, useUnifiedTopology: true });

// Utility function to randomly assign a house
function getRandomHouse() {
  const houses = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];
  return houses[Math.floor(Math.random() * houses.length)];
}

// POST request to add a new student
app.post('/students', async (req, res) => {
  try {
    const { id, name, gender, wizard } = req.body;
    
    // Create a new student with a randomly assigned house if not provided
    const newStudent = new Student({
      id,
      name,
      gender,
      house: req.body.house || getRandomHouse(),
      wizard
    });
    
    // Save the new student to the database
    const savedStudent = await newStudent.save();
    
    // Respond with the newly stored student's data
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
