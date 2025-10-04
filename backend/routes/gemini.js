const router = require("express").Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini AI client with the API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

router.post('/', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        console.log("Received prompt:", prompt);

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        res.json({ generatedText: responseText });

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: error.message || 'Failed to generate content' });
    }
});

module.exports = router;