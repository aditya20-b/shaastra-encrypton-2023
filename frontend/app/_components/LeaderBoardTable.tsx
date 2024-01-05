"use client";

import { useEffect, useState } from "react";
import LeaderBoardCard from "./LeaderboardCard";

export default function LeaderBoardTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/data/fetch")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12 w-full place-items-center pt-8 pb-4 font-Inter">
        <p className="col-span-3">Company</p>
        <p className="col-span-3">Current Emissions</p>
        <p className="col-span-3">Reduction Goal</p>
        <p className="col-span-3">Desirability Score</p>
      </div>
      <div className="grid gap-y-3">
        {data.map((item) => {
          return (
            <LeaderBoardCard
              companyName={item["Name"]}
              currentEmission={item["Emissions"]}
              reductionGoal={item["Emission Reduction Goal"]}
              desirabilityScore={item["desirability"]}
            />
          );
        })}
      </div>
    </div>
  );
}
