import React from "react";

export default function Bento({
  boxSize,
  children,
}: {
  boxSize: "small" | "big";
  children: React.ReactNode;
}) {
  return (
    <>
      {boxSize == "small" ? (
        <div
          className={`col-span-1 flex flex-col py-4 items-center w-full h-[160px] bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-opacity-50 border-white`}
        >
          {children}
        </div>
      ) : (
        <div
          className={`col-span-2 item-center flex flex-col py-4 w-full h-[160px] bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-opacity-50 border-white`}
        >
          {children}
        </div>
      )}
    </>
  );
}
