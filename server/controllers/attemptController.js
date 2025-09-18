import Attempt from '../models/Attempt.js';
import Test from '../models/test.js';

export const logViolation = async (req, res) => {
      try {
        const attemptId = req.params.id;
        const { violationType } = req.body;
        const io = req.io; 

        const attempt = await Attempt.findById(attemptId);
        if (!attempt) {
          return res.status(404).json({ message: 'Attempt not found.' });
        }


        attempt.proctoringLogs.push({ type: violationType });

         const fatalViolations = ['no_face_detected', 'multiple_faces_detected', 'voice_activity_detected'];

          if (fatalViolations.includes(violationType)) {
            attempt.fatalStrikes += 1;
            
          
            io.to(attemptId).emit('fatal_strike_warning', {
              strikes: attempt.fatalStrikes,
              message: `Fatal Warning ${attempt.fatalStrikes}/3: A serious violation was detected.`
            });

           
            if (attempt.fatalStrikes >= 3) {
              io.to(attemptId).emit('force_submit', {
                message: 'Test terminated due to multiple serious violations.'
              });
            }
          }

        await attempt.save();

        res.status(200).json({ message: 'Violation logged successfully.' });
      } catch (error) {
        res.status(500).json({ message: 'Server error while logging violation.' });
      }
    };




export const submitTest = async (req, res) => {
  try {
    const { answers } = req.body;
    const attemptId = req.params.id; 

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
