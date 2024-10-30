"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainLinks as MainLinksConstants } from "../constants";
import { useState, useEffect } from "react";
import Image from "next/image";
import HomeIcon from "@/public/home";

export default function MainLinks() {
  const [width, setWidth] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className=" w-full flex flex-col gap-y-1">
      {MainLinksConstants.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={` pl-5 py-2 text-lg font-medium hover:bg-zinc-700/50 rounded-lg w-full ${
            pathname == link.href && "text-cyan-300"
          }`}
        >
          {width >= 1200 ? (
            link.title
          ) : (
            <HomeIcon fill={pathname == link.href ? '#67e8f9':'#a1a1aa'}/>
          )}
        </Link>
      ))}
    </div>
  );
}
