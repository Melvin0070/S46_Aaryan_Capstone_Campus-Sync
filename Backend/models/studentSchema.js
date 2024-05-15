import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    guardian: { type: String, required: true},
    ID: { type: String, required: true},
    email: { type: String, required: true },
    class: { type: String, required: true },
    sec: { type: String, required: true},
    rollNumber: { type: Number, required:true },
    bloodGroup: { type: String, required: true},
    contacts: { type: String, required: true},    
});




const Student = mongoose.model('students', studentSchema);

export default Student;