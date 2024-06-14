# AI Art with p5.js

This project creates a web application that uses OpenAI's GPT-4 to generate art with p5.js. Users can send a context, and the server generates a p5.js function that draws the specified context.

## Main Files

- **index.js**:
  - Configures the Express server.
  - Handles the POST request to generate a drawing function via OpenAI.
  - Serves the main HTML page.

- **public/js/index.html**:
  - Contains the application layout with a container for art and a button to generate art.
  - Loads necessary scripts for p5.js and jQuery.

- **public/js/art.js**:
  - Sets up the p5.js canvas.
  - Executes dynamically generated drawing functions.

- **public/js/ui.js**:
  - Sets up the p5.js canvas.
  - Executes dynamically generated drawing functions.

- **package.json**:
  - Lists the necessary dependencies for the project, such as Express and OpenAI.

## Installation Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/salvatorecorsi/p5-ai-art/
   cd p5-ai-art

2. **Get an API Key for GPT**:
Just go here: https://platform.openai.com/api-keys

3. **Create config.json**:
As said, create config.json:
```json
    {
        "openaiApiKey": "sk-trolololololololololooololololololo",
        "options": {
            "3d": true,
            "gradients": true,
            "morphing": true,
            "animations": true
        }
    }
```
3. **Gooo**:
Start the server using `node index.js` and go to `localhost:3000` in your browser.