const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    student: { type: String, required: true },
    ID: { type: String, required: true },
    exam: { type: String, required: true },
    date: { type: String, required: true},
    aggregateScore: { type: Number, default: 0 }
});

const Exam = mongoose.model('exams', examSchema);

module.exports = { Exam }