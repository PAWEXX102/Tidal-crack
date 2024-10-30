import Image from "next/image";
import Heart from "@/public/heart";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function FavoriteItem({ item }: Readonly<{ item: any }>) {
  const [hover, setHover] = useState(false);
  const [width, setWidth] = useState(0);

  const removeFavorite = async () => {
    const localFavoriteItems = localStorage.getItem("favoriteItems");
    if (localFavoriteItems) {
      const favoriteItems = JSON.parse(localFavoriteItems);
      const index = favoriteItems.findIndex(
        (items: {
          artist: string;
          album: string;
          title: string;
          type: string;
          feat: [];
        }) =>
          items.artist === item.artist &&
          items.album === item.album &&
          items.title === item.title &&
          items.type === item.type &&
          items.feat === item.feat
      );
      favoriteItems.splice(index, 1);
      localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
    }
  };

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

  console.log(item);

  return (
    <div
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      className={` relative group flex items-center ${
        width >= 1200 ? "justify-start" : "justify-center"
      } gap-x-1 w-full p-2  rounded-2xl hover:bg-zinc-700/50 cursor-pointer`}
    >
      <Image
        src="/Astroworld.jpg"
        alt="Cover"
        width={50}
        height={50}
        className=" rounded-lg group-hover:opacity-50 transition-all opacity-100"
      />
      {width >= 1200 && (
        <>
          <div className=" flex flex-col group-hover:opacity-50 opacity-100 transition-all items-start justify-center ml-1">
            <h1 className=" line-clamp-1 text-medium break-words font-semibold white">
              {item.title}{" "}
              {item.feat.map((feat: string) => "(feat. " + feat + ")")}
            </h1>
            <div className=" flex w-full items-center shadow-inner">
              <h2 className=" text-sm font-semibold text-zinc-400">
                {item.type}
              </h2>
              <Image src="/dot.svg" alt="Song" width={20} height={20} />
              <h2 className=" text-sm font-semibold text-zinc-400">
                {item.artist}
              </h2>
            </div>
          </div>
          <Button
            size="sm"
            className=" absolute z-40 right-3 group-hover:opacity-100 opacity-0"
            variant="light"
            isIconOnly
          >
            <Heart fill />
          </Button>
          <motion.button
            initial={{ scale: 2, opacity: 0 }}
            animate={
              hover ? { scale: 1, opacity: 1 } : { scale: 1.2, opacity: 0 }
            }
            transition={{ duration: 0.3 }}
            className=" absolute z-40 left-[13px] group-hover:opacity-100 opacity-0"
          >
            <Image
              src="/play2.svg"
              alt="Play"
              width={40}
              height={20}
              className=" active:scale-90 hover:scale-110 transition-all"
            />
          </motion.button>
        </>
      )}
    </div>
  );
}
