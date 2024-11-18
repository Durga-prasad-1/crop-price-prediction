from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# Load the CSV file
CROP_DATA_FILE = "data/crop_prices.csv"

@app.route("/predict-price", methods=["POST"])
@app.route("/previous-prices", methods=["POST"])
def previous_prices():
    data = request.json
    state = data.get("state")
    district = data.get("district")
    market = data.get("market")
    commodity = data.get("commodity")
    
    # Validate input
    if not state or not district or not market or not commodity:
        return jsonify({"error": "Missing required parameters"}), 400

    # Load the data
    df = pd.read_csv(CROP_DATA_FILE)

    # Filter the dataset based on user inputs
    filtered_df = df[
        (df["State"] == state) &
        (df["District"] == district) &
        (df["Market"] == market) &
        (df["Commodity"] == commodity)
    ]

    # Check if the filtered dataset is empty
    if filtered_df.empty:
        return jsonify({"error": "No data found for the given inputs"}), 404

    # Convert the filtered data to JSON format for the chart
    result = filtered_df[["Date", "Price"]].to_dict(orient="records")
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
