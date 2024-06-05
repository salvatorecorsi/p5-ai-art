const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const OpenAI = require("openai");
const { openaiApiKey, prompt } = require("./config");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const openai = new OpenAI({
    apiKey: openaiApiKey
});

app.post('/api/generate', async (req, res) => {
    try {

        const generateText = async () => {
            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: "Context: " + prompt + ". Write the content of the function in this way: <code>js of the function that draw the context described</code>, ignore all the configuration of p5, just write the function that draw something. Write now, only <code>js code, without wrapping in \"function {}\"</code>. Comments are not allowed." }],
                model: "gpt-4o",
            });

            // remove all \n from the response
            completion.choices[0].message.content = completion.choices[0].message.content.replace(/`/g, '');
            // remove js from the response
            completion.choices[0].message.content = completion.choices[0].message.content.replace(/js/g, '');
            // remove <code> and </code> from the response
            completion.choices[0].message.content = completion.choices[0].message.content.replace(/<code>/g, '');
            completion.choices[0].message.content = completion.choices[0].message.content.replace(/<\/code>/g, '');
            return '() => {' + completion.choices[0].message.content + '}';
        };
        res.text = await generateText();
        res.json({ function: res.text });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
