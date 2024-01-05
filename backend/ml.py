import math

import pandas as pd
from sklearn.preprocessing import MinMaxScaler

principal = 10_00_000
Z_factor = 5
k_value = 0.8
eri = 0.05
efi = 0
threshold = 0.75

data = pd.read_csv("datasets/companies_final.csv")
data = data.iloc[:2000]


# Assume your DataFrame is loaded and processed as 'data' here
def calculate_x(row):
    global k_value
    global data
    global principal

    beta = 1
    P_in = principal
    Z = Z_factor
    k = k_value * row["Emissions"] + 1
    E_r_i = eri * principal
    E_f_i = efi
    I_in = len(data[data["industry"] == row["industry"]])
    D_sp = 0 if row['disaster_risk'] == "Low" else 1 if row['disaster_risk'] == "Medium" else 2

    gamma = row['importance'] if row['importance'] != 0 else 0.001

    denominator = (k * gamma * math.log(abs(k * gamma))) if (k * gamma * math.log(abs(k * gamma))) else 1

    numerator = P_in * Z
    try:
        InvestmentVsCapital = math.log(I_in / P_in)
    except:
        InvestmentVsCapital = 0

    X = beta / P_in * ((numerator / denominator) - E_r_i * k) - E_f_i + InvestmentVsCapital - (D_sp * 1000)
    return X


# Applying the function to create the 'X' column
data["X"] = data.apply(calculate_x, axis=1)

q1 = data["X"].quantile(0.25)
q3 = data["X"].quantile(0.75)
iqr = q3 - q1

lb = q1 - 1.5 * iqr
ub = q3 + 1.5 * iqr

data = data[(data["X"] >= lb) & (data["X"] <= ub)]
scaler = MinMaxScaler(feature_range=(0, 1))

data["X"] = scaler.fit_transform(data[["X"]])

# Creating the 'Invest' column based on the threshold
data["Invest"] = (data["X"] > threshold).astype(int)

# Separating the features and the target variable
X = data.drop(['Invest', 'name', 'Unnamed: 0', 'locality', 'country'], axis=1)
y = data['Invest']

y.value_counts()

# Converting 'Industry' column to categorical type and then into numerical form

codes = {
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

data['industry'] = [codes.get(x) for x in data["industry"]]

X['industry'] = [codes.get(x) for x in X["industry"]]
X = X.drop(["X"], axis=1)

disaster_risks = []

for i in X["disaster_risk"]:
    if i == "Low":
        disaster_risks.append(1)
    elif i == "Medium":
        disaster_risks.append(2)
    else:
        disaster_risks.append(3)

X["disaster_risk"] = disaster_risks

data["X"] = data.apply(calculate_x, axis=1)

data["Invest"] = data["X"] > threshold

# True-False to 0-1
data['Invest'] = data['Invest'].astype(int)

# Separating the features and the target variable


y = data['Invest']

from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import classification_report, accuracy_score

print(len(data))

print(len(X))
print(X.head())

# Splitting the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Creating and training the Decision Tree Classifier
dt_classifier = DecisionTreeClassifier()
dt_classifier.fit(X_train, y_train)

# Making predictions on the test set
y_pred = dt_classifier.predict(X_test)

# Evaluating the model
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print("Accuracy:", accuracy)


def predict(test_data: dict):
    """
    {
    industry:
    Emissions:
    importance:
    disaster_risk:
    }
    """

    x_value = calculate_x(test_data)
    to_pred = [test_data["industry"], test_data["Emissions"], test_data["importance"], test_data["disaster_risk"]]
    binary = dt_classifier.predict([to_pred])[0]
    emission_units = test_data["Emissions"]

    return {
        "X": x_value,
        "prediction": binary,
        "reduction_per_unit_investment": ((1 - k_value) * emission_units) / principal
    }


SAMPLE_RESPONSE  = {
    "industry": 5,
    "Emissions": 21949,
    "importance": 0.1,
    "disaster_risk": 3
}

# result = predict(test)
# print(result)
