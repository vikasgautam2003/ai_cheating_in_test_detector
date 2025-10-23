import Attempt from '../models/Attempt.js';

export const getMyAttempts = async (req, res) => {
  try {
    const studentId = req.user.id;

    const attempts = await Attempt.find({ studentId: studentId })
      .populate('testId', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json(attempts);

  } catch (error) {
    res.status(500).json({ message: 'Server error fetching your test history.', error });
  }
};




export const getProfileStats = async (req, res) => {
  try {
    const studentId = req.user.id;

    const attempts = await Attempt.find({ studentId: studentId });

    const totalTestsTaken = attempts.length;
    let totalScore = 0;
    let totalPossibleMarks = 0;
    let totalFatalStrikes = 0;

    attempts.forEach(attempt => {
      totalScore += attempt.score;
      totalPossibleMarks += attempt.totalMarks;
      totalFatalStrikes += attempt.fatalStrikes;
    });

    const averageScore = totalPossibleMarks > 0 
      ? Math.round((totalScore / totalPossibleMarks) * 100) 
      : 0;

    res.status(200).json({
      totalTestsTaken,
      averageScore,
      totalFatalStrikes,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error fetching profile stats.', error });
  }
};
