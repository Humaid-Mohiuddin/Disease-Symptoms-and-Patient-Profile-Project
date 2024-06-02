import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pickle

dataset_url = "https://raw.githubusercontent.com/Humaid-Mohiuddin/Disease-Symptoms-and-Patient-Profile-Project/master/Disease_symptom_and_patient_profile_dataset.csv"
df = pd.read_csv(dataset_url)

# Creating a dictionary to store the encoders
encoders = {}

# Label encoding all categorical columns
cols_to_le = ["Disease", "Fever", "Cough", "Fatigue", "Difficulty Breathing", "Gender", "Blood Pressure", "Cholesterol Level"]
for col in cols_to_le:
  le = LabelEncoder()
  df[col] = le.fit_transform(df[col])
  encoders[col] = le

# Saving the encoders
pickle.dump(encoders, open("encoders.pkl", "wb"))

X = df.drop(["Outcome Variable"], axis=1)
Y = df["Outcome Variable"]

x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.25, random_state=0)

rf_model = RandomForestClassifier(max_leaf_nodes = 40, n_estimators = 19, random_state=0)
rf_model.fit(x_train, y_train)

pickle.dump(rf_model, open("model.pkl", "wb"))