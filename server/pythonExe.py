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
CORS(app)


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
        if not data:
            return jsonify({"error": "Invalid input, JSON data expected"}), 400

        # Extract and validate fields
        try:
            days = data['days']
            market = data['market']
            commodity = data['commodity']
            district = data['district']
        except KeyError as e:
            return jsonify({"error": f"Missing field in input: {str(e)}"}), 400

        # Prepare data for prediction
        input_data = pd.DataFrame({
            'Days': [days],
            'Market': [market],
            'Commodity': [commodity],
            'District': [district]
        })
        predicted_min_price = pipeline_min.predict(input_data)[0]
        predicted_max_price = pipeline_max.predict(input_data)[0]

        # Return the prediction as a JSON response
        return jsonify({"prediction":[predicted_min_price,predicted_max_price]});

    except Exception as e:
        return jsonify({"error": str(e)}), 400  
@app.route('/api/extract', methods=['POST'])
def extract():
    try:
        # Parse input from the request
        CSV_FILE_PATH = 'consolidated_data.csv'
        data = request.json
        commodity = data.get('commodity')
        market = data.get('market')
        district = data.get('district')

        # Validate input
        if not all([commodity, market, district]):
            return jsonify({"error": "commodity, market, and district are required."}), 400

        # Read CSV file
        df = pd.read_csv(CSV_FILE_PATH)

        # # Ensure the required columns are present
        required_columns = ['Commodity', 'Market', 'District', 'Arrival_Date', 'Modal_Price']
        if not all(col in df.columns for col in required_columns):
            return jsonify({"error": "CSV file does not contain the required columns."}), 500

        # # Filter data based on the input criteria
        print(df)
        filtered_df = df[
            (df['Commodity']== commodity) &
            (df['Market'] == market) &
            (df['District'] == district)
        ]

        # # Check if any data matches the criteria
        if filtered_df.empty:
            return jsonify({"message": "No data found for the given criteria."}), 404

        # # Select relevant columns and convert to a list of dictionaries
        result = filtered_df[['Arrival_Date', 'Modal_Price']].to_dict(orient='records')
        print(result);
        return jsonify({"data":result}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8800)