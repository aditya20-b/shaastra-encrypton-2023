import pandas as pd
import math
from typing import Dict, Any
from constants import *

def calculate_investment_risk(data: pd.DataFrame) -> float:
    beta: float = 1.0
    emission_factor: float = K_VALUE * data["emissions"] + 1
    risk_investment: float = EMISSION_RISK_INDEX * PRINCIPAL
    environmental_fee: int = ENVIRONMENTAL_FEE_INDEX
    industry_count: int = len(data[data["industry"] == data["industry"]])
    disaster_risk_score: int = {"Low": 0, "Medium": 1, "High": 2}.get(data["disaster_risk"], 0)

    importance_factor: float = data["importance"] if data["importance"] != 0 else 0.001
    denominator: float = max(emission_factor * importance_factor * math.log(abs(emission_factor * importance_factor)), 1)

    numerator: float = PRINCIPAL * Z_FACTOR
    investment_vs_capital: float = math.log(industry_count / PRINCIPAL) if industry_count > PRINCIPAL else 0

    investment_risk: float = (
        beta / PRINCIPAL * ((numerator / denominator) - risk_investment * emission_factor)
        - environmental_fee
        + investment_vs_capital
        - (disaster_risk_score * 1000)
    )
    return investment_risk
