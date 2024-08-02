import express from 'express';
import Student from "./student.model.js";

const router = express.Router();

// Utility function to randomly assign a house
function getRandomHouse() {
    const houses = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];
    return houses[Math.floor(Math.random() * houses.length)];
}

// Add a student
router.post('/students', async (req, res) => {
    try {
        const { id, name, gender, wizard } = req.body;

        // Check if the student already exits
        const exists = await Student.findOne({ id });
        if (exists) {
            return res.status(400).json({
                message: "The student already exists"
            });
        }

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

// Update a student details
router.put('/students/update/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body); // update student details with the contents int the body
        if (!updatedStudent) {
            return res.status(404).json({ message: "The student does not exist" })
        }
        res.send(updatedStudent);
    }
    catch (error) {
        res.status(400).send("error");
    }
});

// Find a student by Id
router.put('/students/details/:id', async (req, res) => {
    try {
        const getStudent = await Student.find(req.params.id);
        if (!getStudent) {
            return res.status(404).json({ message: "The student does not exist" });
        }
        res.send(getStudent);
    }
    catch (error) {
        res.status(400).send(error);
    }
});

// Get all the students
router.get('/students/details', async (req, res) => {
    try {
        const details = await Student.find();
        if (!details) {
            return res.status(404).json({ message: "Please enter student details by visiting '/students' tab" })
        }
        res.send(details);
    }
    catch (error) {
        res.status(400).send(error);
    }
});

// Delete a student by Id
router.delete('/students/remove/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: "The student does not exist" });
        }
        res.json({ message: "Deleted Student" });
    }
    catch (error) {
        res.status(500).send(error);
    }
});

export default router;