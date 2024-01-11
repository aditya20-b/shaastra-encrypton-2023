import numpy as np
import uvicorn
from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette.exceptions import HTTPException as StarletteHTTPException

from models.model import classifier
from models.risk_calculator import calculate_investment_risk
from models.constants import *

class DeltaModel(BaseModel):
    industry: str
    emissions: float
    disaster_risk: float
    importance: float


app = FastAPI()


def convert_encoding(industry: str) -> int:
    return INDUSTRY_CODES.get(industry, -1)  # Returns -1 for unknown industries


# Numpy arrays have issues when they're converted directly into JSON
# Hence, we use this workaround to solve that
def round_all(data: dict) -> dict:
    rounded_dict = {}
    for key, value in data.items():
        if isinstance(value, np.ndarray):
            # Convert to a list
            rounded_dict[key] = np.round(value, 5).tolist()
        elif isinstance(value, (np.int32, np.int64, np.float32, np.float64)):
            # Convert to native int or float
            rounded_dict[key] = np.round(value, 5).item()
        else:
            rounded_dict[key] = round(value, 5)
    return rounded_dict


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(status_code=422, content={"detail": exc.errors()})


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/ping")
async def pong():
    return {"message": "pong"}


@app.post("/predict")
async def handle_model(data: DeltaModel):
    try:
        data_dict = data.model_dump()
        data_dict["industry"] = convert_encoding(data_dict["industry"])
        prediction = classifier.predict(data_dict)
        return round_all(prediction)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

@app.post("/calculate_risk")
async def calc_x(data: DeltaModel):
    try:
        data_dict = data.model_dump()
        data_dict["industry"] = convert_encoding(data_dict["industry"])
        x_value = calculate_investment_risk(data_dict)
        return {"x_value": x_value}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
