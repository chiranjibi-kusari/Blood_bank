import pandas as pd
from sklearn.linear_model import LogisticRegression
import joblib

data = pd.read_csv("matches.csv")
X = data[["distance_km", "units_ratio", "urgency", "recency_days"]]
y = data["success"]

model = LogisticRegression()
model.fit(X, y)

joblib.dump(model, "logistic_model.pkl")
print("Model trained and saved!")
