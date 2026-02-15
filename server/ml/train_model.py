import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
import joblib

# Load data
df = pd.read_csv("training_data.csv")

X = df[
    ["distance_km", "days_since_last_donation", "blood_match", "urgency"]
]
y = df["matched"]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

model = LogisticRegression()
model.fit(X_scaled, y)

joblib.dump(model, "model.pkl")
joblib.dump(scaler, "scaler.pkl")
