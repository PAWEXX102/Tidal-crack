"use client";

import MainLinks from "./mainLinks";
import User from "./user";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Initial width setting
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <main
      className={` bg-zinc-800 ${width >= 1200 ? "w-[24rem]" : "w-[7rem]"} ${
        width <= 950 && "hidden"
      } p-4 h-full flex flex-col gap-y-10`}
    >
      <MainLinks />
    </main>
  );
}
