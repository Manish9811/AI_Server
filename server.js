const express = require('express');
const dotenv = require('dotenv')
const OpenAI = require("openai");
const cors = require("cors");


const app = express();
app.use(express.json())
dotenv.config()

app.use(cors({
    origin: 'http://localhost:3000'
}))

const port = process.env.PORT;

app.get('/', (req,res) => {
    return res.status(200).json({
        message: 'ok'
    })
})

app.post('/api/openAiResponse', async (req, res) => {
    const { question } = req.body;

    try {
        const client = new OpenAI({ apiKey: process.env.OPEN_AI_API });

        const response = await client.responses.create({
            model: "gpt-4o",
            input: question
        });

        return res.status(200).json({
            message: response.output_text
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "internal server error"
        })
    }
})

app.listen(port, () => {
    console.log('app lis running on port ' + port)
})