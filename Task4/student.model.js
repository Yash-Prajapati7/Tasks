import { mongoose, Schema } from 'mongoose';

const studentSchema = new Schema({
    id: { 
        type: String, 
        required: true,
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    gender: { 
        type: String, 
        required: true 
    },
    house: { 
        type: String, 
        required: true 
    },
    wizard: { 
        type: Boolean, 
        required: true 
    },
    ancestry: {
        type: String,
    }
});


const Student = mongoose.model('Student', studentSchema);

export default Student;
