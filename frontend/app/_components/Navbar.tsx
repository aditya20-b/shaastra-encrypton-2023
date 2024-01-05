"use client";

import Link from "next/link";
import { SVGProps } from "react";

export function SolarLogin3BoldDuotone(props: SVGProps<SVGSVGElement>) {
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
        d="M15 2h-1c-2.828 0-4.243 0-5.121.879C8 3.757 8 5.172 8 8v8c0 2.828 0 4.243.879 5.121C9.757 22 11.172 22 14 22h1c2.828 0 4.243 0 5.121-.879C21 20.243 21 18.828 21 16V8c0-2.828 0-4.243-.879-5.121C19.243 2 17.828 2 15 2"
        opacity=".6"
      ></path>
      <path
        fill="currentColor"
        d="M8 8c0-1.538 0-2.657.141-3.5H8c-2.357 0-3.536 0-4.268.732C3 5.964 3 7.143 3 9.5v5c0 2.357 0 3.535.732 4.268c.732.732 1.911.732 4.268.732h.141C8 18.657 8 17.538 8 16v-4.75z"
        opacity=".4"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14.53 11.47a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 1 1-1.06-1.06l.72-.72H5a.75.75 0 0 1 0-1.5h7.19l-.72-.72a.75.75 0 1 1 1.06-1.06z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

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

export default function Navbar() {
  return (
    <nav className="font-Inter h-[110px] bg-white py-8 px-10 flex justify-between items-center shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <div className="font-bold text-3xl text-green-600 flex items-center justify-between">
        <SolarLeafBoldDuotone className="text-4xl" />
        <span className="ml-2">Green</span>
      </div>
      <Link
        href="#"
        className="flex items-center justify-between outline-none text-green-600 border transition-colors border-green-600 p-2 rounded-xl hover:text-white hover:bg-green-600"
      >
        <SolarLogin3BoldDuotone className="text-3xl" />
        <div className="font-bold ml-2">Login</div>
      </Link>
    </nav>
  );
}
