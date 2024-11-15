import pandas as pd
import pickle
import sys
import json
import os
from flask import Flask, jsonify
from flask_cors import CORS
import pickle

# Load the trained Random Forest models
path = os.getcwd()
# with open(path+'\\model_min_price_rf.pkl', 'rb') as file:
#     pipeline_min = pickle.load(file)
app = Flask(__name__)


# Function to get user input and predict
def predict_and_suggest(input_data):
    # Taking input from the user
    days = int(input("Enter the number of days since the first arrival date (e.g., 10): "))
    market = input("Enter the market name (e.g., 'Adilabad'): ")
    commodity = input("Enter the commodity name (e.g., 'Paddy'): ")
    district = input("Enter the district name (e.g., 'Adilabad'): ")

    # Prepare the data for prediction
    input_data = pd.DataFrame({
        'Days': [days],
        'Market': [market],
        'Commodity': [commodity],
        'District': [district]
    })
    
    # Make predictions for Min_Price and Max_Price
    predicted_min_price = pipeline_min.predict(input_data)[0]
    # predicted_max_price = pipeline_max.predict(input_data)[0]

    # Taking today's prices from the user
    today_min_price = float(input("Enter today's minimum price: "))
    # today_max_price = float(input("Enter today's maximum price: "))

    # Providing the suggestion based on the prediction
    if predicted_min_price > today_min_price:
        print(f"Suggested Action for Stake holders: Buy today. Predicted Min Price for tomorrow is {predicted_min_price:.2f}, and today's price is {today_min_price:.2f}.")
    else:
        print(f"Suggested Action for Stake holders: Wait. Predicted Min Price for tomorrow is {predicted_min_price:.2f}, and today's price is {today_min_price:.2f}.")

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
        print(data);

        # Return the prediction as a JSON response
        return jsonify({"prediction":"sucesss"})

    except Exception as e:
        return jsonify({"error": str(e)}), 400
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8800)