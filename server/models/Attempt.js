import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answers: {
    type: Map,
    of: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const Attempt = mongoose.model('Attempt', attemptSchema);
export default Attempt;