"use client";

import { Image } from "@nextui-org/react";
import { useAlbumView } from "../providers/albumViewProvider";
import { motion } from "framer-motion";

export default function AlbumView() {
  const { isOpen, setOpen, url } = useAlbumView();
  return (
    <motion.main
      initial={{ opacity: 0, display: "none" }}
      animate={{ opacity: isOpen ? 1 : 0, display: isOpen ? "flex" : "none" }}
      className={`absolute w-full h-full z-40 transition-all items-center top-0 left-0 flex justify-center`}
    >
      <div
        className="absolute w-full top-0 h-full inset-0 bg-black opacity-70"
        onClick={() => setOpen(false)}
      ></div>
      <Image
        isBlurred
        src={url}
        alt="Album-Cover"
        width={700}
        height={700}
        className="rounded-xl"
      />
    </motion.main>
  );
}
