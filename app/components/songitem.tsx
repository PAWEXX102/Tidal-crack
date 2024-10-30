import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useAudio } from "@/app/providers/audioProvider";
import { db } from "../services/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { storage } from "../services/firebase";
import { getDownloadURL, ref } from "firebase/storage";

export default function SongItem({
  title,
  index,
  id,
}: Readonly<{ title: string; index: number; id: string }>) {
  const {
    setSongs,
    setIsPlaying,
    songs: AudioTitle,
    artist,
    isPlaying,
    album,
    queue,
    setQueue,
    setCurrentAlbum,
    currentArtist,
    setCurrentArtist,
  } = useAudio();
  const [song, setSong] = useState({
    plays: 0,
    indecent: false,
    duration: 0,
    feat: [],
  });

  const [songsArray, setSongsArray] = useState({ songs: [] });

  const [hover, setHover] = useState(false);
  const [width, setWidth] = useState(0);

  const exchangeTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const playing = () => {
    if (AudioTitle[queue] == title) {
      if (isPlaying) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

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

  const fetchSong = async () => {
    let song = { plays: 0, indecent: false, duration: 0, feat: [] };
    let songsArray = { songs: [] };
    const albumRef = doc(collection(db, "albums"), id);
    const albumSnapshot = await getDoc(albumRef);
    const albumData = albumSnapshot.data();
    const songRef = doc(collection(db, "songs"), artist, album, title);
    const songSnapshot = await getDoc(songRef);
    const songData = songSnapshot.data();
    const soundRef = ref(storage, `songs/${artist + " - " + title}.mp3`);
    const soundUrl = await getDownloadURL(soundRef);
    const audio = new Audio(soundUrl);
    const duration = await new Promise<number>((resolve) => {
      audio.addEventListener("loadedmetadata", () => {
        resolve(audio.duration);
      });
    });
    song = {
      plays: songData?.plays,
      indecent: songData?.indecent,
      feat: songData?.feat,
      duration: duration,
    };
    songsArray = {
      songs: albumData?.Songs,
    };

    return { song, songsArray };
  };

  const updatePlays = async () => {
    const songRef = doc(collection(db, "songs"), artist, album, title);
    await updateDoc(songRef, {
      plays: song.plays + 1,
    });
  };

  function formatNumber(num: number): string {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num.toString();
  }

  useEffect(() => {
    async function fetchData() {
      const song = await fetchSong();
      setSong(song.song);
      setSongsArray(song.songsArray);
    }
    fetchData();
  }, []);

  return (
    <div
      onDoubleClick={() => {
        setSongs(songsArray.songs);
        setIsPlaying(playing());
        setCurrentAlbum(album);
        setCurrentArtist(artist);
        setQueue(index - 1);
        updatePlays();
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className=" grid group grid-cols-25 items-center relative transition-all hover:bg-zinc-700/50 rounded-2xl p-3 "
    >
      <Button
        isIconOnly
        variant="light"
        onClick={() => {
          setSongs(songsArray.songs);
          setIsPlaying(playing());
          setCurrentAlbum(album);
          setQueue(index - 1);
          setCurrentArtist(artist);
          updatePlays();
        }}
      >
        <Image
          src={
            AudioTitle[queue] == title && isPlaying
              ? "/stop2.svg"
              : "/play2.svg"
          }
          alt="Action"
          width={30}
          height={30}
          className={`${hover ? "block" : "hidden"}`}
        />
        <Image
          src="/waveform.svg"
          alt="Waveform"
          width={30}
          height={30}
          className={`${
            hover
              ? "hidden"
              : `${AudioTitle[queue] == title ? "block" : "hidden"}`
          }`}
        />
      </Button>
      <h1
        className={` ${
          AudioTitle[queue] == title ? "text-cyan-300" : "text-white"
        } text-xl text-center font-semibold ${width <= 950 && "hidden"}`}
      >
        {index}
      </h1>
      <div
        className={` text-start ${
          width <= 950 ? "col-start-3" : "col-span-10"
        } ${width <= 500 && "col-span-15"} ${
          width > 500 && width < 950 && "col-span-8"
        } ${width <= 650 && "col-start-5"} `}
      >
        <h2
          className={`text-start ${
            title == AudioTitle[queue] ? "text-cyan-300" : "text-white"
          } text-lg font-semibold line-clamp-1`}
        >
          {title}
        </h2>
        <div className=" flex gap-x-1">
          {song.indecent && (
            <div className=" bg-zinc-700 px-[6px] h-max w-max rounded-sm text-sm">
              E
            </div>
          )}
          <h2 className=" text-zinc-400 font-semibold text-sm line-clamp-1">
            {artist}
            {song.feat.length > 0 && (
              <span className=" text-zinc-400">
                {song.feat.map((feat) => ` , ${feat}`)}
              </span>
            )}
          </h2>
        </div>
      </div>
      {width > 500 && (
        <h2 className=" col-span-8 text-zinc-400 font-semibold items-center text-center">
          {formatNumber(song.plays)}
        </h2>
      )}
      <h2
        className={` text-center ${
          width < 650 ? "col-span-4" : "col-span-2"
        } text-zinc-400 font-semibold`}
      >
        {exchangeTime(song.duration)}
      </h2>
    </div>
  );
}
