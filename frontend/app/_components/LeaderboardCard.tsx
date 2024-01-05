import Link from "next/link";

export default function LeaderBoardCard({
  companyName,
  currentEmission,
  reductionGoal,
  desirabilityScore,
}: {
  companyName: string;
  currentEmission: string;
  reductionGoal: string;
  desirabilityScore: string;
}) {
  return (
    <Link
      href="/"
      className="grid grid-cols-12 w-full text-sm place-items-center py-4 font-Inter bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-opacity-50 border-white"
    >
      <p className="col-span-3">{companyName}</p>
      <p className="col-span-3">{currentEmission}</p>
      <p className="col-span-3">{reductionGoal}</p>
      <p className="col-span-3">{desirabilityScore}</p>
    </Link>
  );
}
