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
        const generateFunction = async () => {
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: "You are an artist that express his art through code. You are using p5.js library to draw shapes and colors. You are asked to draw a specific context." },
                    { role: "user", content: "Context: " + prompt + ". Center the draw, consider the canvas width is: "+req.body.canvasSize.width+" and the canvas height is: "+req.body.canvasSize.height+". Write the content of the function in this way: <code>js of the function that draw the context described</code>, ignore all the configuration of p5, just write the function that draw something. Write now, only <code>js code, without wrapping in \"function {}\"</code>. Do not response with: -comments -` -```js -amy extra char"}
                ],
                model: "gpt-4o",
            });

            return '() => {' + completion.choices[0].message.content + '}';
        };
        res.text = await generateFunction();
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
