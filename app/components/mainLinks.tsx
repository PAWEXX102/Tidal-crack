"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainLinks as MainLinksConstants } from "../constants";

export default function MainLinks() {
  const pathname = usePathname();
  return (
    <div className=" w-full flex flex-col gap-y-1">
      {MainLinksConstants.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={` pl-3 py-2 font-medium hover:bg-zinc-700/50 rounded-lg w-full ${
            pathname == link.href && "text-cyan-300"
          }`}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
