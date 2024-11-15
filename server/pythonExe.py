import pandas as pd
import pickle
import sys
import json
import os
from flask import Flask, jsonify,request
from flask_cors import CORS
import pickle

# Load the trained Random Forest models
path = os.getcwd()
with open(path+'\\model_min_price_rf.pkl', 'rb') as file:
    pipeline_min = pickle.load(file)
with open(path+'\\model_max_price_rf.pkl', 'rb') as file:
    pipeline_max = pickle.load(file)
app = Flask(__name__)
CORS(app);


# Function to get user input and predict
def predict_and_suggest(input_data):
    # Taking input from the user
    days = input_data[0]
    market = input_data[1]
    commodity = input_data[2]
    district = input_data[3]

    # Prepare the data for prediction
    input_data = pd.DataFrame({
        'Days': [days],
        'Market': [market],
        'Commodity': [commodity],
        'District': [district]
    })
    
    # Make predictions for Min_Price and Max_Price
    predicted_min_price = pipeline_min.predict(input_data)[0]
    predicted_max_price = pipeline_max.predict(input_data)[0]

    return [predicted_min_price,predicted_max_price];

    # Taking today's prices from the user
    #today_min_price = float(input("Enter today's minimum price: "))
    # today_max_price = float(input("Enter today's maximum price: "))

    # Providing the suggestion based on the prediction
    # if predicted_min_price > today_min_price:
    #     print(f"Suggested Action for Stake holders: Buy today. Predicted Min Price for tomorrow is {predicted_min_price:.2f}, and today's price is {today_min_price:.2f}.")
    # else:
    #     print(f"Suggested Action for Stake holders: Wait. Predicted Min Price for tomorrow is {predicted_min_price:.2f}, and today's price is {today_min_price:.2f}.")

    # if predicted_max_price > today_max_price:
    #     print(f"Suggested Action for farmers: Sell today. Predicted Max Price for tomorrow is {predicted_max_price:.2f}, and today's price is {today_max_price:.2f}.")
    # else:
    #     print(f"Suggested Action for farmers: Wait. Predicted Max Price for tomorrow is {predicted_max_price:.2f}, and today's price is {today_max_price:.2f}.")

# Call the function to predict and suggest actions
@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get the input data from the request (JSON format)
        data = request.get_json()

        # Assuming data contains 'input' that is a list or array-like
        
        data = data.values();
        data = list(data);
        # result="";
        result = predict_and_suggest(data);

        # Return the prediction as a JSON response
        return jsonify({"prediction":result})

    except Exception as e:
        return jsonify({"error": str(e)}), 400
@app.route("/graph",methods=["POST"])
def graph():
    try:
        data = request.get_json()
        data = list(data.values())
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8800)