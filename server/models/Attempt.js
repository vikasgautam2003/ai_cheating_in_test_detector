// import mongoose from 'mongoose';

// const attemptSchema = new mongoose.Schema({
//   testId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Test',
//     required: true,
//   },
//   studentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   answers: {
//     type: Map,
//     of: String,
//     required: true,
//   },
//   score: {
//     type: Number,
//     required: true,
//   },
//   totalMarks: {
//     type: Number,
//     required: true,
//   },

//    proctoringLogs: [{
//     type: {
//       type: String, 
//       required: true,
//     },
//     timestamp: {
//       type: Date,
//       default: Date.now,
//     },
//   }],
// }, { timestamps: true });

// const Attempt = mongoose.model('Attempt', attemptSchema);
// export default Attempt;




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
    default: {},
  },
  score: {
    type: Number,
    default: 0,
  },
  totalMarks: {
    type: Number,
    default: 0,
  },
  fatalStrikes: {
    type: Number,
    default: 0,
  },

 suspicionScore: {
  type: Number,
  default: 0,
},

  proctoringLogs: [{
    type: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
}, { timestamps: true });

const Attempt = mongoose.model('Attempt', attemptSchema);
export default Attempt;
