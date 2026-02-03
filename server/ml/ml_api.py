from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

model = joblib.load("donor_match_model.pkl")

class DonorFeatures(BaseModel):
    distance: float
    days_since_donation: int
    urgency: int

@app.post("/predict")
def predict_priority(data: DonorFeatures):
    features = [[
        data.distance,
        data.days_since_donation,
        data.urgency
    ]]

    probability = model.predict_proba(features)[0][1]

    return {
        "priority_score": round(float(probability), 3)
    }
