import math
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report

PRINCIPAL = 10_00_000
Z_FACTOR = 5
K_VALUE = 0.8
ERI = 0.05
EFI = 0
THRESHOLD = 0.75


def preprocess_data(file_path):
    return pd.read_csv(file_path).iloc[:2000]


def calculate_x(row, principal, k_value, data):
    beta = 1
    P_in = principal
    Z = Z_FACTOR
    k = k_value * row["Emissions"] + 1
    E_r_i = ERI * principal
    E_f_i = EFI
    I_in = len(data[data["industry"] == row["industry"]])
    D_sp = {"Low": 0, "Medium": 1, "High": 2}.get(row["disaster_risk"], 0)

    gamma = row["importance"] if row["importance"] != 0 else 0.001
    denominator = max(k * gamma * math.log(abs(k * gamma)), 1)

    numerator = P_in * Z
    InvestmentVsCapital = math.log(I_in / P_in) if I_in > P_in else 0

    X = (
        beta / P_in * ((numerator / denominator) - E_r_i * k)
        - E_f_i
        + InvestmentVsCapital
        - (D_sp * 1000)
    )
    return X


data = preprocess_data("companies_final.csv")
data["X"] = data.apply(calculate_x, axis=1, args=(PRINCIPAL, K_VALUE, data))
scaler = MinMaxScaler(feature_range=(0, 1))
data["X"] = scaler.fit_transform(data[["X"]])

q1 = data["X"].quantile(0.25)
q3 = data["X"].quantile(0.75)
iqr = q3 - q1
data = data[(data["X"] >= q1 - 1.5 * iqr) & (data["X"] <= q3 + 1.5 * iqr)]

industry_codes = {
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
data["industry"] = data["industry"].map(industry_codes)
data["disaster_risk"] = data["disaster_risk"].map({"Low": 1, "Medium": 2, "High": 3})

data["Invest"] = (data["X"] > THRESHOLD).astype(int)
X = data.drop(["Invest", "name", "Unnamed: 0", "locality", "country", "X"], axis=1)
y = data["Invest"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

dt_classifier = DecisionTreeClassifier()
dt_classifier.fit(X_train, y_train)


def predict(test_data):
    x_value = calculate_x(test_data, PRINCIPAL, K_VALUE, data)
    to_pred = [
        test_data["industry"],
        test_data["Emissions"],
        test_data["importance"],
        test_data["disaster_risk"],
    ]
    binary = dt_classifier.predict([to_pred])[0]
    emission_units = test_data["Emissions"]

    return {
        "X": x_value,
        "prediction": binary,
        "reduction_per_unit_investment": ((1 - K_VALUE) * emission_units) / PRINCIPAL,
    }


TEST_INPUT = {"industry": 5, "Emissions": 21949, "importance": 0.1, "disaster_risk": 3}

# result = predict(test)
# print(result)
