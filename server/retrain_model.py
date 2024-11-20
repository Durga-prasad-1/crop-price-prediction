import pandas as pd
import pickle
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

# Function to load and append new data
def load_and_merge_data(existing_data_path, new_data_path):
    # Load existing dataset
    existing_data = pd.read_csv(existing_data_path)
    
    # Load new data
    new_data = pd.read_csv(new_data_path)
    
    # Append new data to the existing dataset
    updated_data = pd.concat([existing_data, new_data], ignore_index=True)
    return updated_data

# Function to preprocess the data
def preprocess_data(data):
    label_encoder = LabelEncoder()

    # Encode categorical columns
    data['Market'] = label_encoder.fit_transform(data['Market'])
    data['Commodity'] = label_encoder.fit_transform(data['Commodity'])
    data['District'] = label_encoder.fit_transform(data['District'])

    # Ensure the 'Days' column is properly computed
    data['Arrival_Date'] = pd.to_datetime(data['Arrival_Date'], format='%d-%m-%Y')
    reference_date = data['Arrival_Date'].min()
    data['Days'] = (data['Arrival_Date'] - reference_date).dt.days

    # Features and target variables
    X = data[['Days', 'Market', 'Commodity', 'District']]
    y_min = data['Min_Price']
    y_max = data['Max_Price']

    return X, y_min, y_max

# Function to load models from pickle files
def load_models(min_price_model_path, max_price_model_path):
    with open(min_price_model_path, 'rb') as file:
        min_price_model = pickle.load(file)
    with open(max_price_model_path, 'rb') as file:
        max_price_model = pickle.load(file)
    return min_price_model, max_price_model

# Function to retrain models and save them
def retrain_and_update_models(X, y_min, y_max, min_price_model_path, max_price_model_path):
    # Load the models
    min_price_model, max_price_model = load_models(min_price_model_path, max_price_model_path)

    # Retrain the models with new data
    min_price_model.fit(X, y_min)
    max_price_model.fit(X, y_max)

    # Save the updated models back to the pickle files
    with open(min_price_model_path, 'wb') as file:
        pickle.dump(min_price_model, file)

    with open(max_price_model_path, 'wb') as file:
        pickle.dump(max_price_model, file)

    print("Models retrained and updated successfully!")

# Main function to retrain models with new data
def retrain_model_pipeline(existing_data_path, new_data_path, min_price_model_path, max_price_model_path):
    # Load and merge datasets
    updated_data = load_and_merge_data(existing_data_path, new_data_path)

    # Preprocess the data
    X, y_min, y_max = preprocess_data(updated_data)

    # Retrain the models and save updates
    retrain_and_update_models(X, y_min, y_max, min_price_model_path, max_price_model_path)

# File paths
existing_data_path = 'consolidated_data.csv'  # Path to existing dataset
new_data_path = 'new_data.csv'  # Path to new dataset
min_price_model_path = '/model_min_price_rf.pkl'  # Path to Min_Price model
max_price_model_path = '/model_max_price_rf.pkl'  # Path to Max_Price model

# Retrain the models
retrain_model_pipeline(existing_data_path, new_data_path, min_price_model_path, max_price_model_path)

