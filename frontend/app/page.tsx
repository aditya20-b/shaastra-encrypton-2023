"use client";

import React, { useEffect, useState } from "react";
import Bento from "./_components/Bento";
import Heading from "./_components/Heading";
import Search from "./_components/Search";

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

export default function Home() {
  const [value, setValue] = React.useState<CsvData | null>(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/data/fetch")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        setValue(data[0]);
        console.log(data[0]);

        return data;
      });
  }, []);

  return (
    <main className="max-w-[1200px] m-auto py-8">
      <Search value={value} setValue={setValue} />
      <div className="px-[100px]">
        <Heading headingText="Analysis of Aramco" />
        <div className="grid grid-cols-12 gap-2">
          <div className="grid grid-cols-3 grid-rows-3 gap-2 col-span-7 w-full">
            <Bento boxSize="small">
              <p className="font-semibold text-[#333333]">Investor Risk</p>
              <p className="text-4xl flex-grow font-bold text-[#333333] flex items-center">
                {parseInt(value?.["Previous Investments"] / 100)}K
              </p>
            </Bento>
            <Bento boxSize="big">
              <p className="font-semibold text-[#333333] text-center">
                Risk Evaluation
              </p>
              <div className="grid grid-cols-2 flex-grow place-content-center px-10">
                <p className="col-span-1 text-4xl font-bold text-[#174773] text-left">
                  {value?.X_scaled! < 0.75
                    ? "Low"
                    : value?.X_scaled! < 0.6
                    ? "Medium"
                    : value?.X_scaled! < 0.45
                    ? "High"
                    : "Very High"}
                </p>
                <p className="col-span-1 flex-grow text-right">
                  <p className="font-semibold text-[#333333] text-xl  ">
                    13% Risk
                  </p>
                  <p className="text-xs text-neutral-700">
                    Lower than 96% of businesses in this sector
                  </p>
                </p>
              </div>
            </Bento>
            <Bento boxSize="big">
              <p className="font-semibold text-[#333333] text-center">
                Emission Productivity Ratio
              </p>
              <div className="grid grid-cols-4 flex-grow place-content-center px-10">
                <p className="col-span-2 px-5 font-bold font-Inter opacity-45 text-xl grid place-items-center">
                  <p className="">
                    {parseInt(value?.Emissions)} /
                    {parseInt(value?.["Profits Generated"] % 100)}
                  </p>
                </p>
                <p className="text-5xl font-bold text-[#333333] place-self-end col-span-2">
                  {parseInt(value?.["Profit over Emissions"])}
                </p>
              </div>
            </Bento>
            <Bento boxSize="small">
              <p className="font-semibold text-[#333333]">Setup Cost</p>
              <p className="text-5xl flex-grow font-bold text-[#333333] flex items-center">
                22.1
              </p>
            </Bento>
            <Bento boxSize="small">
              <p className="font-semibold text-[#333333]">PEM</p>
              <p className="text-5xl flex-grow font-bold text-[#333333] flex items-center">
                4.73L
              </p>
            </Bento>
            <Bento boxSize="small">
              <p className="font-semibold text-[#333333]">Maintenance</p>
              <p className="text-5xl flex-grow font-bold text-[#333333] flex items-center">
                4.73L
              </p>
            </Bento>
            <Bento boxSize="small">
              <p className="font-semibold text-[#333333]">Disaster Risk</p>
              <p
                className="text-3xl flex-grow font-bold text-[#333333] flex items-center"
                style={{
                  color: "#41903A",
                }}
              >
                Minimal
              </p>
            </Bento>
          </div>
          <div className="col-span-5"></div>
        </div>
      </div>
    </main>
  );
}
