import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
   
});

const Exam = mongoose.model('exams', examSchema);

export default Exam;