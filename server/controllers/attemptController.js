import Attempt from '../models/Attempt.js';
import Test from '../models/test.js';




;


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
//       io.to(attemptId).emit('fatal_strike_warning', {
//         strikes: attempt.fatalStrikes,
//         message: `Fatal Warning ${attempt.fatalStrikes}/5: A serious violation was detected. (${violationType})`
//       });
//       if (attempt.fatalStrikes >= 6) {
//         io.to(attemptId).emit('force_submit', {
//           message: 'Test terminated due to multiple serious violations.'
//         });
//       }
//     }

//     const suspiciousViolations = ['tab_switch', 'averted_gaze'];
//     if (suspiciousViolations.includes(violationType)) {
//       let scoreToAdd = 0;
//       if (violationType === 'tab_switch') scoreToAdd = 2;
//       else if (violationType === 'averted_gaze') scoreToAdd = 1;

//       const oldScore = attempt.suspicionScore || 0;
//       const newScore = oldScore + scoreToAdd;
//       attempt.suspicionScore = newScore;

//       const thresholds = [5, 10, 15];
//       let crossedThreshold = null;
//       thresholds.forEach(t => {
//         if (oldScore < t && newScore >= t) crossedThreshold = t;
//       });

//       if (crossedThreshold) {
//         io.to(attemptId).emit('suspicion_score_warning', {
//           score: newScore,
//           message: `Suspicion level increased. Please maintain focus.`
//         });
//       }

//       if (newScore >= 20) {
//         io.to(attemptId).emit('force_submit', {
//           message: 'Test terminated due to high suspicion score.'
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

    const now = new Date();
    const lastLog = attempt.proctoringLogs[attempt.proctoringLogs.length - 1];

    // ⛔ Prevent rapid duplicate logs for same violation (esp. "averted_gaze")
    if (lastLog && lastLog.type === violationType && (now - new Date(lastLog.timestamp) < 10000)) {
      return res.status(200).json({ message: 'Violation logged recently.' });
    }

    // ✅ Push violation log with timestamp
    attempt.proctoringLogs.push({ type: violationType, timestamp: now });

    // ⚠️ Fatal violations logic
    const fatalViolations = ['no_face_detected', 'multiple_faces_detected', 'voice_activity_detected'];
    if (fatalViolations.includes(violationType)) {
      attempt.fatalStrikes += 1;
      io.to(attemptId).emit('fatal_strike_warning', {
        strikes: attempt.fatalStrikes,
        message: `Fatal Warning ${attempt.fatalStrikes}/5: Serious violation detected. (${violationType})`
      });

      if (attempt.fatalStrikes >= 6) {
        io.to(attemptId).emit('force_submit', {
          message: 'Test terminated due to multiple serious violations.'
        });
      }
    }

    // 👀 Suspicious violations logic
    const suspiciousViolations = ['tab_switch', 'averted_gaze'];
    if (suspiciousViolations.includes(violationType)) {
      let scoreToAdd = 0;
      if (violationType === 'tab_switch') scoreToAdd = 2;
      if (violationType === 'averted_gaze') scoreToAdd = 3; // ↑ stronger penalty for gaze

      const oldScore = attempt.suspicionScore || 0;
      const newScore = Math.min(oldScore + scoreToAdd, 20); // cap at 20
      attempt.suspicionScore = newScore;

      // 🚨 Threshold warnings at 5, 10, 15
      const thresholds = [5, 10, 15];
      let crossedThreshold = null;
      thresholds.forEach(t => {
        if (oldScore < t && newScore >= t) crossedThreshold = t;
      });

      if (crossedThreshold) {
        io.to(attemptId).emit('suspicion_score_warning', {
          score: newScore,
          message: `Suspicion level increased (Score: ${newScore}). Please maintain focus.`
        });
      }

      // 💣 Auto-submit if suspicion score too high
      if (newScore >= 20) {
        io.to(attemptId).emit('force_submit', {
          message: 'Test terminated due to high suspicion score.'
        });
      }
    }

    await attempt.save();
    res.status(200).json({ message: 'Violation logged successfully.' });

  } catch (error) {
    console.error("Error logging violation:", error);
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
