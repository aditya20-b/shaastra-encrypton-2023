from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.exceptions import RequestValidationError
from ml import predict
import numpy as np
import uvicorn

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
    importance: float

app = FastAPI()

def convert_encoding(industry: str) -> int:
    return MANUAL_ENCODING.get(industry, -1)  # Returns -1 for unknown industries

# Numpy arrays have issues when they're converted directly into JSON
# so we use this dirty workaround to solve that
def round_all(data: dict) -> dict:
    rounded_dict = {}
    for key, value in data.items():
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
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(status_code=422, content={"detail": exc.errors()})

@app.get("/ping")
async def pong():
    return {"message": "pong"}

@app.post("/predict")
async def handle_model(data: DeltaModel):
    try: 
        data_dict = data.dict()
        data_dict["industry"] = convert_encoding(data_dict["industry"])
        prediction = predict(data_dict)
        return round_all(prediction)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
