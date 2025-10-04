import Test from '../models/test.js';
import Attempt from '../models/Attempt.js';
import Complaint from '../models/Complaint.js';

// export const getDashboardStats = async (req, res) => {
//   try {
//     const adminId = req.user.id;

//     const tests = await Test.find({ createdBy: adminId }).select('_id');
//     const testIds = tests.map(test => test._id);

//     const totalTests = testIds.length;

//     const totalAttempts = await Attempt.countDocuments({ testId: { $in: testIds } });

//     const attempts = await Attempt.find({ testId: { $in: testIds } });

//     let passCount = 0;
//     attempts.forEach(attempt => {
//       if ((attempt.score / attempt.totalMarks) >= 0.5) {
//         passCount++;
//       }
//     });

//     const failCount = totalAttempts - passCount;

//     res.status(200).json({
//       totalTests,
//       totalAttempts,
//       passFailData: {
//         pass: passCount,
//         fail: failCount,
//       },
//     });

//   } catch (error) {
//     res.status(500).json({ message: 'Server error fetching dashboard stats.', error });
//   }
// };





export const getDashboardStats = async (req, res) => {
  try {
    const adminId = req.user.id;

    const tests = await Test.find({ createdBy: adminId }).select('_id');
    const testIds = tests.map(test => test._id);

    const totalTests = testIds.length;

    const totalAttempts = await Attempt.countDocuments({ testId: { $in: testIds } });

    const attempts = await Attempt.find({ testId: { $in: testIds } });

    let passCount = 0;
    let totalScoreSum = 0;

    attempts.forEach(attempt => {
      totalScoreSum += attempt.score;
      if ((attempt.score / attempt.totalMarks) >= 0.5) {
        passCount++;
      }
    });

    const failCount = totalAttempts - passCount;

    const averageScore = attempts.length
      ? ((totalScoreSum / attempts.reduce((acc, a) => acc + a.totalMarks, 0)) * 100).toFixed(2)
      : 0;

    res.status(200).json({
      totalTests,
      totalAttempts,
      averageScore,
      passFailData: {
        pass: passCount,
        fail: failCount,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error fetching dashboard stats.', error });
  }
};





export const getAdminTests = async (req, res) => {
  try {
    const adminId = req.user.id;
    const tests = await Test.find({ createdBy: adminId }).sort({ createdAt: -1 });
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching tests.', error });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const testId = req.params.id;
    const adminId = req.user.id;

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found.' });
    }
    if (test.createdBy.toString() !== adminId) {
      return res.status(403).json({ message: 'User not authorized to delete this test.' });
    }

    await Test.findByIdAndDelete(testId);
    await Attempt.deleteMany({ testId: testId });

    res.status(200).json({ message: 'Test and all associated attempts deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting test.', error });
  }
};




export const getAllAttemptsForAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;
    const tests = await Test.find({ createdBy: adminId }).select('_id');
    const testIds = tests.map(test => test._id);
    const attempts = await Attempt.find({ testId: { $in: testIds } })
      .populate('studentId', 'email')
      .populate('testId', 'title')
      .sort({ createdAt: -1 });
    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching attempts.', error });
  }
};







export const getRecentActivity = async (req, res) => {
    try {
        const adminId = req.user.id;
        const tests = await Test.find({ createdBy: adminId }).select('_id');
        const testIds = tests.map(test => test._id);

        const recentAttempts = await Attempt.find({ testId: { $in: testIds } })
            .sort({ createdAt: -1 })
            .limit(5) 
            .populate('studentId', 'email')
            .populate('testId', 'title');
        
        res.status(200).json(recentAttempts);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching recent activity.', error });
    }
};





export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({})
      .populate('studentId', 'email')
      .populate({
        path: 'attemptId',
        populate: {
          path: 'testId',
          model: 'Test',
          select: 'title'
        }
      })
      .sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints.', error });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found.' });
    }
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Error updating complaint status.', error });
  }
};