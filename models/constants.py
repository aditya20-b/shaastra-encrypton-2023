PRINCIPAL: int = 1_000_000
Z_FACTOR: int = 5
K_VALUE: float = 0.8
EMISSION_RISK_INDEX: float = 0.05
ENVIRONMENTAL_FEE_INDEX: int = 0
THRESHOLD: float = 0.75
PATH = "../datasets/companies_final.csv"

INDUSTRY_CODES = {
    "information technology and services": 0,
    "military": 1,
    "accounting": 2,
    "retail": 3,
    "computer software": 4,
    "telecommunications": 5,
    "defense & space": 6,
    "financial services": 7,
    "management consulting": 8,
    "banking": 9,
}