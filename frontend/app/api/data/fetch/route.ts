// pages/api/convertCsv.ts

import fs from "fs";
import csv from "csv-parser";
import { NextRequest, NextResponse } from "next/server";

export interface CsvData {
  Name: string;
  Industry: string;
  Emissions: number;
  "Profits Generated": number;
  "Initial Investment Capital": number;
  "Emission Reduction Goal": number;
  "Transition Risk": number;
  "Previous Investments": number;
  "Market Size": number;
  "Disaster Susceptibility": number;
  "Initial Setup Cost": number;
  "Emission Reduction Percent": number;
  Bias: number;
  "Profit over Emissions": number;
  "Policy Percent": number;
  X: number;
  Invest: number;
  X_scaled: number;
  desirability: number;
  EmissionsPerRupee: number;
  ROI: number;
}

export async function GET(getReq: NextRequest) {
  const csvFilePath = "/home/Gizem/Encrypton/app/api/data/fetch/preliminar.csv"; // Replace with the actual path to your CSV file

  const data: CsvData[] = [];

  try {
    const fileStream = fs.createReadStream(csvFilePath);

    await new Promise<void>((resolve, reject) => {
      fileStream
        .pipe(csv())
        .on("data", (row) => {
          const obj: CsvData = {
            Name: row.Name,
            Industry: row.Industry,
            Emissions: parseFloat(row.Emissions),
            "Profits Generated": parseFloat(row["Profits Generated"]),
            "Initial Investment Capital": parseFloat(
              row["Initial Investment Capital"]
            ),
            "Emission Reduction Goal": parseFloat(
              row["Emission Reduction Goal"]
            ),
            "Transition Risk": parseFloat(row["Transition Risk"]),
            "Previous Investments": parseFloat(row["Previous Investments"]),
            "Market Size": parseFloat(row["Market Size"]),
            "Disaster Susceptibility": parseFloat(
              row["Disaster Susceptibility"]
            ),
            "Initial Setup Cost": parseFloat(row["Initial Setup Cost"]),
            "Emission Reduction Percent": parseFloat(
              row["Emission Reduction Percent"]
            ),
            Bias: parseFloat(row.Bias),
            "Profit over Emissions": parseFloat(row["Profit over Emissions"]),
            "Policy Percent": parseFloat(row["Policy Percent"]),
            X: parseFloat(row.X),
            Invest: parseFloat(row.Invest),
            X_scaled: parseFloat(row.X_scaled),
            desirability: row.desirability,
            EmissionsPerRupee: parseFloat(row.EmissionsPerRupee),
            ROI: parseFloat(row.ROI),
          };

          data.push(obj);
        })
        .on("end", () => {
          resolve();
        })
        .on("error", (error) => {
          reject(error);
        });
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading CSV file:", error);
    return NextResponse.error();
  }
}
