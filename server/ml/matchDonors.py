import joblib
import numpy as np

model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")

def score_donor(distance, days_since_last, blood_match, urgency):
    X = np.array([[distance, days_since_last, blood_match, urgency]])
    X_scaled = scaler.transform(X)
    return model.predict_proba(X_scaled)[0][1]
