"use client";

import Image from "next/image";
import AlbumView from "@/app/components/albumView";
import { useAudio } from "@/app/providers/audioProvider";
import { useEffect, useState } from "react";
import { useAlbumView } from "@/app/providers/albumViewProvider";
import { Button } from "@nextui-org/react";
import Heart from "@/public/heart";
import { db } from "@/app/services/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/app/services/firebase";
import SongItem from "@/app/components/songitem";
import Repeat from "@/public/repeat";

export default function Album({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { setUrl, setOpen } = useAlbumView();
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [width, setWidth] = useState(0);
  const {
    setSongs,
    setIsPlaying,
    setAlbum,
    setArtist,
    setCurrentAlbum,
    setIsLooping,
    setAlbumId,
    isLooping,
    currentAlbum,
    album: albumName,
    isPlaying,
  } = useAudio();
  const [AlbumInfo, setAlbumInfo] = useState({
    Title: "",
    Artist: "",
    Year: 0,
    Songs: [],
    Durations: 0,
    color: "",
  });

  const exchangeTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    let result = "";
    if (hours > 0) {
      result += `${hours} hour${hours > 1 ? ". " : ""} `;
    }
    if (minutes > 0) {
      result += `${minutes} min${minutes > 1 ? "." : ""} `;
    }
    if (seconds > 0 || result === "") {
      result += `${seconds} sec${seconds > 1 ? "." : ""}`;
    }

    return result.trim();
  };

  const getAlbum = async () => {
    let album = {
      Title: "",
      Artist: "",
      Year: 0,
      Songs: [],
      Durations: 0,
      color: "",
    };
    const albumRef = doc(collection(db, "albums"), params.id);
    const albumSnapshot = await getDoc(albumRef);
    const albumData = albumSnapshot.data();
    const imageRef = ref(storage, `albumCovers/${albumData?.Title}.jpg`);
    const imageUrl = await getDownloadURL(imageRef);
    const durations = await Promise.all(
      albumData?.Songs.map(async (song: string) => {
        const songRef = ref(
          storage,
          `songs/${albumData?.Artist + " - " + song}.mp3`
        );
        const songUrl = await getDownloadURL(songRef);
        return new Promise<number>((resolve) => {
          const audio = new Audio(songUrl);
          audio.addEventListener("loadedmetadata", () => {
            resolve(audio.duration);
          });
        });
      })
    );
    console.log(albumData?.Songs);
    album = {
      Title: albumData?.Title,
      Artist: albumData?.Artist,
      Year: albumData?.Year,
      Songs: albumData?.Songs,
      Durations: durations.reduce((acc, curr) => acc + curr, 0),
      color: albumData?.color,
    };
    return { album, imageUrl };
  };

  useEffect(() => {
    async function fetchData() {
      const album = await getAlbum();
      setAlbumInfo(album.album);
      setImageUrl(album.imageUrl);
      setIsLoading(false);
      setAlbum(album.album.Title);
      setArtist(album.album.Artist);
      setAlbumId(params.id);
    }
    fetchData();
  }, []);

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

  const playing = () => {
    if (albumName == AlbumInfo?.Title) {
      console.log("Playing");
      if (isPlaying) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const actionImage = () => {
    if (currentAlbum == AlbumInfo?.Title) {
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
    <main className="relative bg-black w-full h-full overflow-auto">
      <div
        className="absolute inset-0 bg-cover h-full bg-center bg-gradient-to-t from-black bg-no-repeat filter"
        style={{
          backgroundImage: `linear-gradient(to top, black, ${AlbumInfo?.color})`,
        }}
      ></div>
      <div className="absolute inset-0 w-full h-full bg-black opacity-50"></div>
      <div
        className={`relative p-10 z-10 flex ${
          width <= 950 ? "flex-col items-center" : "items-end flex-row"
        } justify-center w-full`}
      >
        <Image
          src={imageUrl}
          alt="Album-Cover"
          width={300}
          height={300}
          className="rounded-xl hover:scale-105 transition-all cursor-pointer active:scale-95"
          onClick={() => {
            setOpen(true);
            setUrl(imageUrl);
          }}
        />
        <div
          className={` w-full justify-end flex flex-col ${
            width <= 950 ? "ml-0" : "ml-7"
          }`}
        >
          <h1
            className={`text-7xl font-semibold text-white ${
              width <= 950 ? "mt-5 mb-2" : "mb-5"
            }`}
          >
            {AlbumInfo?.Title}
          </h1>
          <div
            className={` w-full flex h-full ${
              width <= 950 ? "flex-col items-start" : "flex-row items-center"
            }`}
          >
            <div className=" flex items-center">
              <Image
                src="/TravisScott.jpg"
                alt="Author"
                width={30}
                height={30}
                className=" rounded-full"
              />
              <h2 className=" ml-1 font-semibold text-white">
                {AlbumInfo?.Artist}
              </h2>
            </div>

            {width > 950 && (
              <Image src="/dot.svg" alt="Song" width={20} height={20} />
            )}
            <h2
              className={` ${
                width <= 950 ? "order-last mt-2" : "ml-1"
              } font-medium text-zinc-300`}
            >
              {AlbumInfo?.Year}
            </h2>
            {width > 950 && (
              <Image src="/dot.svg" alt="Song" width={20} height={20} />
            )}
            <div
              className={` flex items-center ${width <= 950 ? "mt-2" : "ml-1"}`}
            >
              <h2 className=" font-medium text-zinc-300">
                {AlbumInfo?.Songs.length} songs
              </h2>
              <Image src="/dot.svg" alt="Song" width={20} height={20} />
              <h2 className=" text-xs border-zinc-300 font-medium text-zinc-300 border-2 rounded-full py-[2px] px-2">
                {exchangeTime(AlbumInfo?.Durations)}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-5 flex-col relative to-100% z-10 h-max flex w-full">
        <div className=" bg-black opacity-15 w-full h-full absolute"></div>
        <div className=" p-10 z-20 w-full h-max items-center flex gap-x-10">
          <Image
            src={actionImage()}
            alt="Action"
            width={70}
            onClick={() => {
              setSongs(AlbumInfo?.Songs);
              setIsPlaying(playing());
              setCurrentAlbum(AlbumInfo?.Title);
            }}
            height={70}
            className=" hover:scale-110 active:scale-90 transition-all cursor-pointer"
          />
          <Button
            isIconOnly
            size="lg"
            variant="light"
            onClick={() => setIsLooping(!isLooping)}
          >
            <Repeat fill={isLooping ? "#67e8f9" : "#FFF"} size={70} />
          </Button>
        </div>
        <div className=" p-10 z-20 w-full flex h-max flex-col gap-y-5">
          <div className=" text-zinc-400 px-3 font-semibold z-10 w-full grid grid-cols-25 h-max">
            {width > 950 && <div className=" col-start-2 text-center">#</div>}
            <div
              className={` text-start ${
                width <= 950 ? "col-start-3" : "col-span-10"
              } ${width <= 500 && "col-span-15"} ${
                width > 500 && width < 950 && "col-span-8"
              } ${width <= 650 && "col-start-5"} `}
            >
              Title
            </div>
            {width > 500 && (
              <div className=" col-span-8 text-center">Plays</div>
            )}
            <div className=" col-span-2 text-center">Duration</div>
          </div>
          <div className=" w-full h-[2px] rounded-full bg-zinc-400"></div>
          <div className=" flex flex-col w-full gap-y-3 h-full">
            {AlbumInfo?.Songs.map((song, index) => (
              <SongItem key={index} title={song} index={index + 1} id={params.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
