import sys, json, joblib, numpy as np
import warnings
warnings.filterwarnings("ignore", category=UserWarning)

model = joblib.load("logistic_model.pkl")

raw = sys.stdin.read()
features = json.loads(raw)

X = np.array([[features["distance"], features["units_ratio"], features["urgency"], features["recency_days"]]])
prob = model.predict_proba(X)[0][1]

print(prob)
