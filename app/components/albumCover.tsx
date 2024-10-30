import NextImage from "next/image";
import { storage } from "../services/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAudio } from "../providers/audioProvider";

export default function AlbumCover({
  title,
  artist,
  id,
  songs,
}: {
  title: string;
  artist: string;
  id: string;
  songs: string[];
}) {
  const [url, setUrl] = useState<string>("");
  const [hover, setHover] = useState(false);
  const {
    setSongs,
    setIsPlaying,
    setAlbum,
    isPlaying,
    setArtist,
    setCurrentAlbum,
    setCurrentArtist,
    setAlbumId,
    setQueue,
    currentAlbum,
  } = useAudio();

  useEffect(() => {
    const fetchImage = async () => {
      const imageRef = ref(storage, `albumCovers/${title}.jpg`);
      const imageUrl = await getDownloadURL(imageRef);
      setUrl(imageUrl);
    };

    fetchImage();
  }, [title]);

  const actionImage = () => {
    if (currentAlbum == title) {
      if (isPlaying) {
        return "/stop2.svg";
      } else {
        return "/play2.svg";
      }
    } else {
      return "/play2.svg";
    }
  };

  return (
    <Link
      href={`/album/${id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className=" p-4 group hover:bg-zinc-700/30 cursor-pointer transition-all w-max h-max rounded-2xl"
    >
      <div className=" relative">
        <Image
          as={NextImage}
          src={url}
          className=" rounded-xl group-hover:opacity-50 transition-all"
          alt="Album-Cover"
          width={200}
          height={200}
        />
        <motion.button
          initial={{ scale: 2, opacity: 0 }}
          animate={
            hover ? { scale: 1, opacity: 1 } : { scale: 1.2, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
          className=" absolute z-40 left-[13px] bottom-3 my-auto  group-hover:opacity-100 opacity-0"
          onClick={(e) => {
            e.preventDefault();
            setSongs(songs);
            setIsPlaying(true);
            setAlbum(title);
            setArtist(artist);
            setCurrentAlbum(title);
            setCurrentArtist(artist);
            setAlbumId(id);
            setQueue(0);
          }}
        >
          <Image
            src={actionImage()}
            alt="Play"
            width={80}
            height={80}
            className=" active:scale-90 hover:scale-110 transition-all"
          />
        </motion.button>
      </div>
      <div className=" flex flex-col mt-3">
        <h1 className=" text-2xl font-semibold text-white">{title}</h1>
        <h2 className=" font-semibold text-zinc-400">{artist}</h2>
      </div>
    </Link>
  );
}
