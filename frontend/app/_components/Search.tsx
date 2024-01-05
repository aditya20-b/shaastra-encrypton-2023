import Image from "next/image";
import Link from "next/link";
import React, { SVGProps } from "react";
import { CsvData } from "../page";

export function SolarLeafBoldDuotone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 22c-4.418 0-8-3.646-8-8.143c0-4.462 2.553-9.67 6.537-11.531A3.453 3.453 0 0 1 12 2z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M13.463 2.326A3.453 3.453 0 0 0 12 2v7l4.432-4.432c-.863-.947-1.86-1.724-2.97-2.242"
        opacity=".3"
      ></path>
      <path
        fill="currentColor"
        d="M12 9v5.5l6.614-6.614c-.572-1.22-1.308-2.357-2.182-3.318z"
        opacity=".4"
      ></path>
      <path
        fill="currentColor"
        d="m12 19.5l7.811-7.811a14.94 14.94 0 0 0-1.197-3.803L12 14.5z"
        opacity=".6"
      ></path>
      <path
        fill="currentColor"
        d="M19.811 11.689L12 19.5V22c4.418 0 8-3.646 8-8.143c0-.71-.064-1.438-.189-2.168"
        opacity=".7"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsLightLeaderboard(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M3.77 20V10h4.153v10zm5.96 0V4h4.54v16zm6.347 0v-8h4.154v8z"
      ></path>
    </svg>
  );
}

export default function Search({ value, setValue }: {
  value: CsvData | null;
  setValue: (value: any) => void;
}) {
  const searchRef = React.useRef<HTMLInputElement>(null);
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  })

  const handleSearch = () => {
    const query = searchRef.current?.value

    if (query) {
      const result = data.filter((item) => item.name.includes(query))
      const first = result[0]
      setValue(first)
    }

  }

  return (
    <div className="grid grid-cols-12 gap-3">
      <Link href="/" className="col-span-1 flex justify-center">
        <SolarLeafBoldDuotone className="text-5xl text-[#A5FF47]" />
      </Link>
      <div className="col-span-10 flex">
        <input
          ref={searchRef}
          onChange={handleSearch}
          type="text"
          className=" px-5 py-3 outline-none w-full rounded-[10px_0px_0px_10px]"
        ></input>
        <button className="p-2.5 bg-white rounded-[0_10px_10px_0px] col-span-1 place-self-center">
          <Image
            src="/assets/images/Search.png"
            alt="Search"
            height="30"
            width="30"
          />
        </button>
      </div>
      <Link
        href="/leaderboard"
        className="col-span-1 place-items-center p-2 rounded-[10px] w-fit bg-white"
      >
        <MaterialSymbolsLightLeaderboard className="text-3xl text-[#545454]" />
      </Link>
    </div>
  );
}
