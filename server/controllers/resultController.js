import Attempt from "../models/Attempt.js";

export const getResultById = async (req, res) => {

    try{

        const attempt = await Attempt.findById(req.params.id)
         .populate('testId', 'title') 
         .populate('studentId', 'email');
         
         if (!attempt) {
            return res.status(404).json({ message: 'Result not found.' });
        }

        res.json(attempt);
    } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }

};