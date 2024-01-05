# Projekt

## Aim
This project aims to provide recommendations and aid towards projects and stocks that promote sustainable development.

## Overview
This project uses a Decision Tree classifier model that is capable of determining whether 
the net positive environmental impact is optimal for optimal investment

This tool is unique because it can be used by both small investors and large firms looking to make a difference.

## Key Features
Projekt takes into account various factors while determining the optimality of an investment, such as:
-  Capital invested
- The Profit/Emission ratio (Emission Productivity)
- Emission Reduction Goal - which indicates the "green" intent of the company
- Expected cost for maintaining the investment with changes in fiscal and monetary policy by the governing body
- Initial setup cost of the investment
- Interest shown by other investors towards the general industry - gives a sense of the trend of the industry
- Susceptibility towards disaster and extreme climate events
- Industry-specific emission reduction biases
  - reduction of 10% in emission in an industry which is heavily reliant on emission is more significant than a 15% emission reduction in an industry that hardly burns fuel. 

## Model and Algorithm
Our decision-making process is underpinned by two core components:

1. **Decision Tree Algorithm:** This machine learning algorithm offers straightforward, accurate predictions applicable to a wide range of data scales. It provides a binary outcome (Yes/No) to indicate the advisability of investing in a particular stock.

2. **Mathematical Model:** Complementing the Decision Tree, this model generates a probability score (ranging from 0 to 1) to offer a nuanced view of each investment opportunity. This stochastic approach enhances decision-making with a more detailed analysis.


## Reasoning
- Investors may be small or large, so we need to make sure that the model is able to predict for all magnitudes of data.
- The Emission-Productivity value is very important in the study of sustainable development, hence it is imperative that we consider it in our calculation
- To make the Machine Learning Model as straightforward, simple, and accurate as possible, the Decision Tree algorithm was used.
- This model provides an end result in the form of a Yes or No, indicating whether it is safe to buy the stock for the company in question.
- To complement this, a Mathematical model is constructed, which gives a stochastic value between 0 and 1, for better analysis and informed decision. After all, we are only providing recommendations.
- The mathematical model is as follows.
  
![Math Model](https://github.com/aditya20-b/shaastra-encrypton-2023/assets/71256476/33dde29b-3b28-41b1-8474-1fbf0a604a4c)

