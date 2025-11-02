

import Complaint from '../models/Complaint.js';

export const createComplaint = async (req, res) => {
  try {
    const { attemptId, message } = req.body;
    const studentId = req.user.id;

    if (!attemptId || !message) {
      return res.status(400).json({ message: 'Attempt ID and message are required.' });
    }

    const newComplaint = new Complaint({
      studentId,
      attemptId,
      message,
    });

    await newComplaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error submitting complaint.', error });
  }
};