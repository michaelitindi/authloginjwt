const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    questions: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;