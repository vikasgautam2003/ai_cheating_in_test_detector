// testGenAI.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testAPIKey() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent("Hello World");
    const text = (await result.response).text();

    console.log("API works! Model responded:", text);
  } catch (err) {
    console.error("API test failed:", err);
  }
}

testAPIKey();
