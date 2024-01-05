from fastapi import FastAPI, HTTPException, Cookie, Header, Request
from fastapi.responses import JSONResponse
from datetime import datetime
from pydantic import BaseModel
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.exceptions import RequestValidationError
from ml import predict
import json
import numpy as np


MANUAL_ENCODING = {
    "information technology and services": 0,
    "military": 1,
    "accounting": 2,
    "retail": 3,
    "computer software": 4,
    "telecommunications": 5,
    "defense & space": 6,
    "financial services": 7,
    "management consulting": 8,
    "banking": 9
}


class DeltaModel(BaseModel):
    industry: str
    Emissions: float
    disaster_risk: float
    importance: float # This is bias


# Define a model for the request data
app = FastAPI()



def convert_encoding(industry):
    return MANUAL_ENCODING[industry]

def round_all(dic):
    rounded_dict = {}
    for key, value in dic.items():
        if isinstance(value, np.ndarray):
            # Convert to a Python list
            rounded_dict[key] = np.round(value, 5).tolist()
        elif isinstance(value, (np.int32, np.int64, np.float32, np.float64)):
            # Convert to Python native int or float
            rounded_dict[key] = np.round(value, 5).item()
        else:
            rounded_dict[key] = round(value, 5)
    return rounded_dict

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

# Custom exception handler for RequestValidationError
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors()},
    )

@app.get("/ping")
async def pong():
    start_time = datetime.now()
    end_time = datetime.now()
    duration = (end_time - start_time).total_seconds()
    return {"message": "pong", "duration": f"{duration} seconds"}


@app.post("/predict")
async def handle_model(data: DeltaModel):
    try: 

        data_dict = data.dict()
        # print(data_dict)
        prediction = predict(data_dict) 
        prediction = round_all(prediction)
        # print(prediction)
        
        return prediction
        
    except Exception as e:
        return {"error": "Something went wrong. Stacktrace: " + str(e)}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
