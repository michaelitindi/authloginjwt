const Interview = require('../models/Interview'); // Assuming you will create this model

// Controller function to create an interview session
const createInterview = async (req, res) => {
    const { title, description, questions } = req.body;

    try {
        const newInterview = new Interview({
            title,
            description,
            questions,
        });

        await newInterview.save();
        res.status(201).json({ message: 'Interview created successfully', interview: newInterview });
    } catch (error) {
        res.status(500).json({ message: 'Error creating interview', error: error.message });
    }
};

module.exports = { createInterview };