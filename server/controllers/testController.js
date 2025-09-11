import Test from "../models/test.js"


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