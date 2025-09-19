import Attempt from '../models/Attempt.js';
import Test from '../models/test.js';




// export const logViolation = async (req, res) => {
//   try {
//     const attemptId = req.params.id;
//     const { violationType } = req.body;
//     const io = req.io;

//     const attempt = await Attempt.findById(attemptId);
//     if (!attempt) return res.status(404).json({ message: 'Attempt not found.' });

//     attempt.proctoringLogs.push({ type: violationType });

//     const fatalViolations = ['no_face_detected', 'multiple_faces_detected', 'voice_activity_detected'];
//     if (fatalViolations.includes(violationType)) {
//       attempt.fatalStrikes += 1;

//       // Emit warning to frontend
//       io.to(attemptId).emit('fatal_strike_warning', {
//         strikes: attempt.fatalStrikes,
//         message: `Fatal Warning ${attempt.fatalStrikes}/3: A serious violation was detected. (${violationType})`
//       });

//       if (attempt.fatalStrikes >= 3) {
//         io.to(attemptId).emit('force_submit', {
//           message: 'Test terminated due to multiple serious violations.'
//         });
//       }
//     }

//     await attempt.save();
//     res.status(200).json({ message: 'Violation logged successfully.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error while logging violation.' });
//   }
// };


export const logViolation = async (req, res) => {
  try {
    const attemptId = req.params.id;
    const { violationType } = req.body;
    const io = req.io;

    const attempt = await Attempt.findById(attemptId);
    if (!attempt) return res.status(404).json({ message: 'Attempt not found.' });

    attempt.proctoringLogs.push({ type: violationType });

    const fatalViolations = ['no_face_detected', 'multiple_faces_detected', 'voice_activity_detected'];
    if (fatalViolations.includes(violationType)) {
      attempt.fatalStrikes += 1;
      io.to(attemptId).emit('fatal_strike_warning', {
        strikes: attempt.fatalStrikes,
        message: `Fatal Warning ${attempt.fatalStrikes}/4: A serious violation was detected. (${violationType})`
      });
      if (attempt.fatalStrikes >= 4) {
        io.to(attemptId).emit('force_submit', {
          message: 'Test terminated due to multiple serious violations.'
        });
      }
    }

    const suspiciousViolations = ['tab_switch', 'averted_gaze'];
    if (suspiciousViolations.includes(violationType)) {
      let scoreToAdd = 0;
      if (violationType === 'tab_switch') scoreToAdd = 2;
      else if (violationType === 'averted_gaze') scoreToAdd = 1;

      const oldScore = attempt.suspicionScore || 0;
      const newScore = oldScore + scoreToAdd;
      attempt.suspicionScore = newScore;

      const thresholds = [5, 10, 15];
      let crossedThreshold = null;
      thresholds.forEach(t => {
        if (oldScore < t && newScore >= t) crossedThreshold = t;
      });

      if (crossedThreshold) {
        io.to(attemptId).emit('suspicion_score_warning', {
          score: newScore,
          message: `Suspicion level increased. Please maintain focus.`
        });
      }

      if (newScore >= 20) {
        io.to(attemptId).emit('force_submit', {
          message: 'Test terminated due to high suspicion score.'
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
