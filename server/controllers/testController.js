import Test from "../models/test.js"
import Attempt from "../models/Attempt.js";


export const createTest = async (req, res) => {

    try{
        const { title, duration, questions } = req.body;
        
        const createdBy = req.user.id || req.user._id;


        const newTest = new Test({ title, duration, questions, createdBy });


        const savedTest = await newTest.save();
        res.status(201).json(savedTest);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



export const getAllTests = async (req, res) => {
    try {
        const tests = await Test.find({}).populate('createdBy', 'email');

        res.status(200).json(tests);
    } catch (error) {
       res.status(500).json({ message: 'Server error while fetching tests.', error });
}

}



export const getTestById = async (req, res) => {

    try{

        const testId = req.params.id;

         const test = await Test.findById(testId).select('-questions.correctAnswer');

        if (!test) {
          return res.status(404).json({ message: 'Test not found.' });
        }

        res.status(200).json(test);
    } catch (error) {
          console.error('Error fetching test by ID:', error);
          res.status(500).json({ message: 'Server error while fetching the test.' });
    }
}




// export const submitTest = async (req, res) => {

//     try{

//         const { answers } = req.body;
//         const testId = req.params.id;
//         const studentId = req.user.id || req.user._id;

//         const originalTest = await Test.findById(testId);

//         if(!originalTest) {
//             return res.status(404).json({ message: 'Test not found' });
//         }

//         let score = 0;
//         originalTest.questions.forEach((question, index) => {
//             if(questions.correctAnswer === answers[index]) {
//                 score++;
//             }
//         });

//         const newAttempt = new Attempt({
//             testId,
//             studentId,
//             answers,
//             score,
//             totalMarks: originalTest.questions.length
//         });

//         const savedAttempt = await newAttempt.save();

//         res.status(201).json(savedAttempt);

//     } catch(error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// }



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


export const startTest = async (req, res) => {
  try {
    const testId = req.params.id;
    const studentId = req.user.id; 


    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found.' });
    }

 
    const newAttempt = new Attempt({
      testId,
      studentId,
      answers: {}, 
      score: 0,    
      totalMarks: test.questions.length,
      proctoringLogs: [], 
    });

    await newAttempt.save();

    
    res.status(201).json({ attemptId: newAttempt._id });

  } catch (error) {
    res.status(500).json({ message: 'Server error while starting test.', error });
  }
};
