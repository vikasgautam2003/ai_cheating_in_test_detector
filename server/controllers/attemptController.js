import Attempt from '../models/Attempt.js';

export const logViolation = async (req, res) => {
      try {
        const attemptId = req.params.id;
        const { violationType } = req.body;

        const attempt = await Attempt.findById(attemptId);
        if (!attempt) {
          return res.status(404).json({ message: 'Attempt not found.' });
        }

        // Add the new log to the array
        attempt.proctoringLogs.push({ type: violationType });
        await attempt.save();

        res.status(200).json({ message: 'Violation logged successfully.' });
      } catch (error) {
        res.status(500).json({ message: 'Server error while logging violation.' });
      }
    };



// export const submitTest = async (req, res) => {
//   try {
//     const { answers } = req.body;
//     const testId = req.params.id;
//     const studentId = req.user.id || req.user._id;

//     const originalTest = await Test.findById(testId);

//     if (!originalTest) {
//       return res.status(404).json({ message: "Test not found" });
//     }

//     let score = 0;
//     originalTest.questions.forEach((question, index) => {
//       if (answers[index] && question.correctAnswer === answers[index]) {
//         score++;
//       }
//     });

//     const newAttempt = new Attempt({
//       testId,
//       studentId,
//       answers,
//       score,
//       totalMarks: originalTest.questions.length,
//     });

//     const savedAttempt = await newAttempt.save();

//     res.status(201).json(savedAttempt);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
    


export const submitTest = async (req, res) => {
  try {
    const { answers } = req.body;
    const attemptId = req.params.id;  // <-- now it's attemptId, not testId

    // Find the existing attempt
    const attempt = await Attempt.findById(attemptId).populate("testId");
    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    const originalTest = attempt.testId;
    let score = 0;

    originalTest.questions.forEach((question, index) => {
      if (answers[index] && question.correctAnswer === answers[index]) {
        score++;
      }
    });

    attempt.answers = answers;
    attempt.score = score;
    await attempt.save();

    res.status(200).json(attempt);
  } catch (error) {
    res.status(500).json({ message: "Server error while submitting test", error: error.message });
  }
};
