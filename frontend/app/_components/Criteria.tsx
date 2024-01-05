export default function Criteria({
  selectedCriteria,
  setSelectedCriteria,
}: {
  selectedCriteria: string;
  setSelectedCriteria: React.Dispatch<
    React.SetStateAction<
      "Electronics" | "Agriculture" | "Energy" | "Fashion" | "Steel"
    >
  >;
}) {
  return (
    <div>
      <button
        style={{
          backgroundColor:
            selectedCriteria === "Electronics" ? "#7EC877" : "transparent",
        }}
        className="py-3 px-8 font-medium font-Inter rounded-xl"
        onClick={() => setSelectedCriteria("Electronics")}
      >
        Electronics
      </button>
      <button
        style={{
          backgroundColor:
            selectedCriteria === "Agriculture" ? "#7EC877" : "transparent",
        }}
        className="py-3 px-8 font-medium font-Inter rounded-xl"
        onClick={() => setSelectedCriteria("Agriculture")}
      >
        Agriculture
      </button>
      <button
        style={{
          backgroundColor:
            selectedCriteria === "Energy" ? "#7EC877" : "transparent",
        }}
        className="py-3 px-8 font-medium font-Inter rounded-xl"
        onClick={() => setSelectedCriteria("Energy")}
      >
        Energy
      </button>
      <button
        style={{
          backgroundColor:
            selectedCriteria === "Fashion" ? "#7EC877" : "transparent",
        }}
        className="py-3 px-8 font-medium font-Inter rounded-xl"
        onClick={() => setSelectedCriteria("Fashion")}
      >
        Fashion
      </button>
      <button
        style={{
          backgroundColor:
            selectedCriteria === "Steel" ? "#7EC877" : "transparent",
        }}
        className="py-3 px-8 font-medium font-Inter rounded-xl"
        onClick={() => setSelectedCriteria("Steel")}
      >
        Steel
      </button>
    </div>
  );
}
