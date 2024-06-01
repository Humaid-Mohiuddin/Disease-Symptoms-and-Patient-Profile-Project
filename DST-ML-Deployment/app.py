import pandas as pd
from flask import Flask, request, jsonify, render_template
import pickle

# Creating flask app
app = Flask(__name__)

# Loading the pickle model
model = pickle.load(open("model.pkl", "rb"))

# Loading the pickle encoders
encoders = pickle.load(open("encoders.pkl", "rb"))

@app.route('/')
def home():
    return render_template("index.html")


@app.route('/predict', methods = ['POST'])
def predict():
    data = request.get_json()

    # Preparing the input data
    input_data = {
        'Disease': data['disease'],
        'Fever': data['fever'],
        'Cough': data['cough'],
        'Fatigue': data['fatigue'],
        'Difficulty Breathing': data['difficulty_breathing'],
        'Age': data['age'],
        'Gender': data['gender'],
        'Blood Pressure': data['blood_pressure'],
        'Cholesterol Level': data['cholesterol']
    }

    # Transforming categorical features using the respective encoders
    for column in encoders.keys():
        input_data[column] = encoders[column].transform([input_data[column]])[0]

    # Converting to DataFrame
    input_df = pd.DataFrame([input_data])

    # Predicting
    prediction = model.predict(input_df)

    return jsonify({'prediction':prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)