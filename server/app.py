from flask import Flask, request, jsonify
import base64
import requests
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate

import os
import re
import json

# load api keys
load_dotenv("secret/.env")

app = Flask(__name__)





@app.route("/gen", methods=["POST"])
def process_image_route():
    data = request.json
    if "image_data" not in data:
        return jsonify({"error": "No image data"}), 400

    try:
        image_b64 = data["image_data"]

        # preprocess image
        image = Image.open(BytesIO(image_b64))
        processed_image = process_image(image)
        buffered = BytesIO()
        processed_image.save(buffered, format="PNG")
        processed_b64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

        # pass to openai

        res = None
        return jsonify(res), 200
    except:
        return jsonify({"error": "Image could not be processed"}), 500


if __name__ == "__main__":
    app.run(debug=True)
