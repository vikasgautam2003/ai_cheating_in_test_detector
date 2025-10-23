import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({

    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true }
});


const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    duration: {
        type: Number,
        required: true
    },

    questions: [questionSchema],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

const Test = mongoose.model('Test', testSchema);
export default Test;