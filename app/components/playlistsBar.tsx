'use client'

import Image from "next/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import  Playlists from './playlists';

export default function PlaylistsBar() {
  return (
    <main className=" w-full flex flex-col gap-y-1 text-sm">
      <div className=" flex items-center justify-between relative">
        <h1 className=" pl-3 font-semibold text-zinc-400">PLAYLISTS</h1>
        <Dropdown placement="right" className="">
          <DropdownTrigger>
            <Image
              src="/dots.png"
              alt="playlist"
              width={15}
              height={20}
              className=" cursor-pointer hover:scale-105 active:scale-95 transition-all"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="sort"
            >
              Sort
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Playlists />
    </main>
  );
}
