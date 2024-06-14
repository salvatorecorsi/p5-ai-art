const fs = require('fs');
if (!fs.existsSync('./config.json')) {
    fs.writeFileSync('./config.json', JSON.stringify({ openaiApiKey: "", prompt: "" }, null, 2));
}

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const OpenAI = require("openai");
const { openaiApiKey, options } = require("./config");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const openai = new OpenAI({
    apiKey: openaiApiKey
});


function sanitizeResponse(response) {
    response = response.replace(/```json/g, '');
    response = response.replace(/```javascript/g, '');
    response = response.replace(/```js/g, '');
    response = response.replace(/`/g, '');
    response = response.replace('function draw() {', '() => {');
    response = response.replace('function draw(){', '() => {');

    let result = {
        draw_function: '',
        description: ''
    };
    try {
        result = JSON.parse(response);
    }
    catch (error) {
        result['description'] = 'An error occurred while parsing the response from the AI model.';
    }

    return result;
}

async function generateFunction(prompt) {

    let additionalOptions = '';
    let hasOptions = false;
    for (let option in options) {
        if (options[option]) {
            hasOptions = true;
            break;
        }
    }

    if (hasOptions) {
        additionalOptions = 'I would love if you use this effects: ';
        for (let option in options) {
            if (options[option]) {
                additionalOptions += option + ', ';
            }
        }
    }

    const formatterEndPrompt = " Write complex code! There is already setup() function and the canvas already exist, so you MUST CREATE DRAW FUNCTION ONLY. " + options + " Response must be a JSON that has 2 attribute: {'draw_function': 'ONLY the draw function in JS code, no comments or empty lines or any others functions. Write a lot of code complex artwork with 3d', 'description': 'Choose the name of the artwork'}";

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system", content: "You are an artist that express his art through code using p5.js library to draw shapes and colors." + formatterEndPrompt
            },
            { role: "user", content: prompt + formatterEndPrompt },
        ],
        model: "gpt-4o",
        temperature: 1,
    });

    const result = sanitizeResponse(completion.choices[0].message.content);

    return result;
};

app.post('/api/generate', async (req, res) => {
    try {
        const response = await generateFunction(req.body.prompt);
        res.json(response);
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
