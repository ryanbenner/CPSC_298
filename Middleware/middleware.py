from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Constants
HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/"
API_KEY = os.getenv("HUGGING_FACE_API_KEY")

app = Flask(__name__)

def get_hugging_face_response(model, payload):
    """Send payload to Hugging Face API and get response."""
    headers = {
        "Authorization": f"Bearer {API_KEY}"
    }
    response = requests.post(HUGGING_FACE_API_URL + model, headers=headers, json=payload)
    return response.json()

@app.route('/api/query', methods=['POST'])
def query_model():
    """Handle requests to query Hugging Face model."""
    data = request.json
    model = data.get("model")
    input_text = data.get("input")

    if not model or not input_text:
        return jsonify({"error": "Model and input text are required."}), 400

    payload = {
        "inputs": input_text
    }

    try:
        hf_response = get_hugging_face_response(model, payload)
        return jsonify({"result": hf_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
