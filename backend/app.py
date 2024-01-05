from fastapi import FastAPI, HTTPException, Cookie, Header, Request
from fastapi.responses import JSONResponse
from datetime import datetime
from pydantic import BaseModel
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.exceptions import RequestValidationError


MANUAL_ENCODING = {}


class DeltaModel(BaseModel):
    industry: str
    Emissions: float
    disaster_susceptibility: float
    importance: float # This is bias


# Define a model for the request data
app = FastAPI()



def convert_encoding(industry):
    return MANUAL_ENCODING[industry]


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
        prediction = predict(data_dict) 
        return prediction
    
    except Exception as e:
        return {"error": "Something went wrong. Stacktrace: " + str(e)}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
