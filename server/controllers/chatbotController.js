// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const generateQuestions = async (req, res) => {
//     try {
//         const { topic, count, difficulty } = req.body;
//         if (!topic || !count || !difficulty) {
//             return res.status(400).json({ message: 'Topic, question count, and difficulty are required.' });
//         }

//         const model = genAI.getGenerativeModel({ 
//             model: "gemini-2.5-flash",
//             temperature: 0.7

//          });

//         const prompt = `
//             You are an expert test creator for an online exam platform. Your task is to generate ${count} multiple-choice questions about the topic "${topic}" with a difficulty level of "${difficulty}".

//             Your response MUST be ONLY a valid JSON array of objects. Do not include any introductory text, explanation, or markdown formatting like \`\`\`json. Your entire response should start with '[' and end with ']'.

//             Each object in the array must have these exact keys and data types:
//             - "questionText": a string containing the question.
//             - "options": an array of exactly 4 strings.
//             - "correctAnswer": a string that is an exact match to one of the items in the "options" array.

//             Example of the required output format:
//             [
//               {
//                 "questionText": "What is the capital of France?",
//                 "options": ["London", "Berlin", "Paris", "Madrid"],
//                 "correctAnswer": "Paris"
//               }
//             ]
//         `;

//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const text = response.text();

//         const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
//         const generatedJson = JSON.parse(cleanedText);

//         res.status(200).json(generatedJson);

//     } catch (error) {
//         console.error("Error generating questions:", error);
//         res.status(500).json({ message: "Failed to generate questions. The AI may have returned an invalid format. Please try modifying your topic or try again." });
//     }
// };







import { GoogleGenerativeAI } from '@google/generative-ai';


export const generateQuestions = async (req, res) => {
    try {
        const { topic, count, difficulty } = req.body;
        if (!topic || !count || !difficulty) {
            return res.status(400).json({ message: 'Topic, question count, and difficulty are required.' });
        }
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); 
     
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.0-flash",
            temperature: 0.7
        });

        const prompt = `
            You are an expert test creator for an online exam platform. Your task is to generate ${count} multiple-choice questions about the topic "${topic}" with a difficulty level of "${difficulty}".

            Your response MUST be ONLY a valid JSON array of objects. Do not include any introductory text, explanation, or markdown formatting like \`\`\`json. Your entire response should start with '[' and end with ']'.

            Each object in the array must have these exact keys and data types:
            - "questionText": a string containing the question.
            - "options": an array of exactly 4 strings.
            - "correctAnswer": a string that is an exact match to one of the items in the "options" array.

            Example of the required output format:
            [
              {
                "questionText": "What is the capital of France?",
                "options": ["London", "Berlin", "Paris", "Madrid"],
                "correctAnswer": "Paris"
              }
            ]
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const generatedJson = JSON.parse(cleanedText);

        res.status(200).json(generatedJson);

    } catch (error) {
        console.error("Error generating questions:", error);
        res.status(500).json({ message: "Failed to generate questions. The AI may have returned an invalid format. Please try modifying your topic or try again." });
    }
};
