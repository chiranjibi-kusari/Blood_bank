from sklearn.linear_model import LogisticRegression
import joblib

# Features:
# [distance_km, days_since_donation, urgency_level]
X = [
    [2, 120, 3],
    [15, 20, 1],
    [5, 90, 2],
    [1, 200, 3],
    [30, 10, 1],
]

# Label: 1 = successful match, 0 = failed
y = [1, 0, 1, 1, 0]

model = LogisticRegression()
model.fit(X, y)

joblib.dump(model, "donor_match_model.pkl")
print("✅ ML model trained & saved")
