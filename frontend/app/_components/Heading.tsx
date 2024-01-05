export default function Heading({ headingText }: { headingText: string }) {
  return (
    <p className="text-3xl font-Inter font-semibold py-4">{headingText}</p>
  );
}
