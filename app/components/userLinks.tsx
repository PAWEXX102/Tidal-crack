'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import { AccountLinks } from "../constants"
import Image from "next/image"


export default function UserLinks() {
    const pathname = usePathname()
    return(
        <main className=" w-full flex flex-col gap-y-1 text-sm">
            <h1 className=" pl-3 font-semibold text-zinc-400">YOUR MUSIC</h1>
            {AccountLinks.map((link) => (
                <Link
                    href={link.href}
                    key={link.href}
                    className={` py-2 pl-3 flex items-center gap-x-2 hover:bg-zinc-700/50 rounded-lg w-full ${
                        pathname == link.href && "text-cyan-300"
                    }`}
                >
                    <Image src={pathname == link.href ? `/${link.title}Active.png`:`/${link.title}.png`} alt={link.title} width={25} height={20} />
                    {link.title}

                </Link>
            ))}
        </main>
    )
}