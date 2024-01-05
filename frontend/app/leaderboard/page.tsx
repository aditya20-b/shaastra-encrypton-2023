"use client";

import { useState } from "react";
import Heading from "../_components/Heading";
import Search from "../_components/Search";
import Criteria from "../_components/Criteria";
import LeaderBoardTable from "../_components/LeaderBoardTable";
import { CsvData } from "../page";

export default function LeaderBoard() {
  const [selectedCriteria, setSelectedCriteria] = useState<
    "Electronics" | "Agriculture" | "Energy" | "Fashion" | "Steel"
  >("Electronics");
  const [value, setValue] = useState<CsvData | null>(null); 

  return (
    <main className="max-w-[1200px] m-auto py-8">
      <Search value={value} setValue={setValue} />
      <div className="px-[100px] pt-10">
        <Heading headingText="Explore Industries" />
        <Criteria
          selectedCriteria={selectedCriteria}
          setSelectedCriteria={setSelectedCriteria}
        />
        <LeaderBoardTable />
      </div>
    </main>
  );
}
