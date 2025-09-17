from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import logging
from datetime import datetime

app = Flask(__name__)
CORS(app)

logging.basicConfig(
    filename="chatbot.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

def log_message(role, content):
    logging.info(f"{role.upper()}: {content}")

def get_system_prompt():
    return """
    You are a Mathematics Chatbot, designed to provide clear, accurate, and concise answers to mathematical questions. 
    Follow these guidelines:
    1. Provide step-by-step explanations for complex problems, including relevant formulas and reasoning.
    2. Use a friendly and encouraging tone to make math approachable.
    3. Format answers using Markdown for clarity (e.g., use bullet points, LaTeX for equations, and code blocks for calculations).
    4. If the question is ambiguous, ask for clarification before proceeding.
    5. For simple queries, give direct answers but include a brief explanation.

    Example format for complex problems:
    - **Problem**: [Restate the problem]
    - **Solution**:
      - Step 1: [Explain step]
      - Step 2: [Explain step]
      - ...
    - **Final Answer**: [Provide the answer]

    If you are asked any other questions not pertaining to the field of math, reply with a "Sorry I was built only for helping with math."
    """

def process_chat_query(api_key, selected_model, prompt):
    try:
        if not api_key:
            return {"error": "Please provide a Gemini API key."}, 400

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(
            model_name=selected_model,
            system_instruction=get_system_prompt()
        )
        response = model.generate_content(prompt)
        
        if response.candidates and response.candidates[0].content.parts:
            full_response = response.candidates[0].content.parts[0].text
            log_message("user", prompt)
            log_message("assistant", full_response)
            return {"response": full_response}, 200
        else:
            return {"error": "No valid response from Gemini API."}, 500

    except Exception as e:
        log_message("error", str(e))
        return {"error": f"Processing error: {str(e)}"}, 500

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid request body."}), 400

    api_key = data.get('api_key')
    selected_model = data.get('model', 'gemini-2.5-flash')
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({"error": "Prompt is required."}), 400

    response, status_code = process_chat_query(api_key, selected_model, prompt)
    return jsonify(response), status_code

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)