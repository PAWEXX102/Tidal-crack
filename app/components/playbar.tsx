"use client";

import { Button, Image, Slider } from "@nextui-org/react";
import NextImage from "next/image";
import Heart from "@/public/heart";
import { useEffect, useState, useRef } from "react";
import { useAudio } from "../providers/audioProvider";
import Repeat from "@/public/repeat";
import { db, storage } from "../services/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export default function PlayBar() {
  const [volume, setVolume] = useState(0);
  const [width, setWidth] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const { songs, isPlaying, setIsPlaying, artist, album, queue, setQueue } =
    useAudio();
  const [isLooped, setIsLooped] = useState(false);
  const [soundUrl, setSoundUrl] = useState("");
  const [albumUrl, setAlbumUrl] = useState("");
  const refAudio = useRef<HTMLAudioElement>(null);
  const [song, setSong] = useState({
    indecent: false,
    feat: [],
    duration: 0,
  });

  const fetchSong = async () => {
    console.log(artist, album, songs);
    let song = { indecent: false, duration: 0, feat: [] };
    if (!artist || !album || !songs) return { song, url: "", albumUrl: "" };
    console.log(artist, album, songs[queue]);
    if (queue >= songs.length) {
      console.log("Queue is empty");
      refAudio.current?.pause();
      return { song, url: "", albumUrl: "" };
    }
    const songRef = doc(collection(db, "songs"), artist, album, songs[queue]);
    const songSnapshot = await getDoc(songRef);
    const songData = songSnapshot.data();
    const soundRef = ref(storage, `songs/${artist + " - " + songs[queue]}.mp3`);
    const soundUrl = await getDownloadURL(soundRef);
    const albumRef = ref(storage, `albumCovers/${album}.jpg`);
    const albumUrl = await getDownloadURL(albumRef);
    const audio = new Audio(soundUrl);
    const duration = await new Promise<number>((resolve) => {
      audio.addEventListener("loadedmetadata", () => {
        resolve(audio.duration);
      });
    });
    song = {
      indecent: songData?.indecent,
      feat: songData?.feat,
      duration: duration,
    };

    console.log(song);
    console.log(soundUrl);
    return { song, url: soundUrl, albumUrl: albumUrl };
  };

  const handlePlayPause = () => {
    console.log(isPlaying);
    if (refAudio.current && song?.duration > 0) {
      if (isPlaying) {
        console.log("Pause");
        refAudio.current.pause();
        setIsPlaying(false);
      } else {
        console.log("Play");
        setIsPlaying(true);
        refAudio.current.play();
      }
      console.log(isPlaying);
    }
  };

  useEffect(() => {
    if (currentTime >= song?.duration && song?.duration > 0) {
      setQueue(queue + 1);
    }
  }, [currentTime]);

  const handleVolume = () => {
    if (refAudio.current) {
      refAudio.current.volume = volume / 100;
    }
  };

  const handleTimeUpdate = () => {
    if (refAudio.current) {
      console.log(refAudio.current?.currentTime);
      setCurrentTime(refAudio.current.currentTime);
    } else {
      throw new Error("Audio element not found");
    }
  };

  const exchangeTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleSliderChange = async (
    value: number[] | number
  ): Promise<void> => {
    if (refAudio.current && !isNaN(song?.duration)) {
      const newValue = Array.isArray(value) ? value[0] : value;
      refAudio.current.currentTime = newValue;
      setCurrentTime(newValue);
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

  useEffect(() => {
    const audioElement = refAudio.current;
    if (audioElement) {
      const handleLoadedMetadata = () => {
        handleTimeUpdate();
      };

      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.addEventListener("timeupdate", handleTimeUpdate);

      // Cleanup event listeners on component unmount
      return () => {
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [songs, queue, isPlaying]);
  useEffect(() => {
    const audioElement = refAudio.current;
    if (audioElement) {
      const handleCanPlayThrough = () => {
        refAudio.current?.play();
        handleVolume();
      };

      audioElement.addEventListener("canplaythrough", handleCanPlayThrough);

      // Cleanup event listener on component unmount
      return () => {
        audioElement.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
      };
    }
  }, [soundUrl]);

  useEffect(() => {
    async function fetchData() {
      const song = await fetchSong();
      setSong(song.song);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      refAudio.current?.play();
    } else {
      refAudio.current?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    async function fetchData() {
      const song = await fetchSong();
      setSong(song.song);
      setSoundUrl(song.url || "");
      setAlbumUrl(song.albumUrl || "");
    }
    console.log(songs)
    console.log(queue)
    fetchData();
  }, [songs, queue]);

  useEffect(() => {
    handleVolume();
  }, [volume]);

  return (
    <main
      className={`absolute bottom-0 z-20 px-[1rem] h-24 flex ${
        width >= 850 ? "flex" : "flex-col"
      } justify-between w-full bg-black`}
    >
      {soundUrl && (
        <audio
          className=" absolute"
          src={soundUrl}
          ref={refAudio}
          loop={isLooped}
        />
      )}
      <div className=" h-full min-w-[26rem] ju w-full items-center flex gap-x-4">
        <Image
          as={NextImage}
          src={albumUrl}
          alt="Album-Cover"
          width={70}
          height={70}
          radius="sm"
          className=" cursor-pointer"
          isZoomed
        />
        <div className=" flex flex-col items-start text-center">
          <div className=" flex items-center text-lg font-semibold gap-x-2">
            <h1 className=" text-medium font-semibold">
              {songs[queue] || "Astroworld"}
            </h1>
            {song.indecent && (
              <div className=" bg-zinc-700 px-[6px] rounded-sm text-sm">E</div>
            )}
            <div className=" border-2 rounded-full px-2 text-xs border-zinc-700 text-zinc-400">
              {exchangeTime(song?.duration)}
            </div>
          </div>
          <h2 className=" text-sm font-semibold hover:underline cursor-pointer text-zinc-400">
            {artist}
            {song?.feat?.length > 0 && (
              <span className=" text-zinc-400">
                {song.feat.map((feat) => ` , ${feat}`)}
              </span>
            )}
          </h2>
        </div>
      </div>
      <div className=" min-w-[20rem] w-full h-full items-center flex flex-col justify-center">
        <div className=" w-full flex gap-x-3 items-center justify-center">
          <Button isIconOnly variant="light">
            <Image src="/backward.svg" alt="Previous" width={30} height={30} />
          </Button>
          <Button
            isIconOnly
            variant="light"
            onClick={() => {
              setIsPlaying(!isPlaying);
              handlePlayPause();
            }}
          >
            <Image
              src={isPlaying ? "/stop.svg" : "/play.svg"}
              alt="action"
              width={30}
              height={30}
            />
          </Button>
          <Button isIconOnly variant="light">
            <Image src="/nextward.svg" alt="Next" width={30} height={30} />
          </Button>
          <Button
            onClick={() => setIsLooped(!isLooped)}
            isIconOnly
            variant="light"
          >
            <Repeat fill={isLooped ? "#67e8f9" : "#a1a1aa"} size={30} />
          </Button>
        </div>
        <Slider
          color="foreground"
          size="md"
          showOutline
          step={1}
          maxValue={song?.duration}
          value={currentTime}
          aria-label="Song Progress"
          onChange={(value) => handleSliderChange(value)}
        />
      </div>
      <div className=" w-full items-center justify-end flex">
        <Slider
          startContent={
            <Image
              src={volume > 0 ? "/volume.svg" : "/mute.svg"}
              alt="Volume"
              width={30}
              height={30}
            />
          }
          step={1}
          maxValue={100}
          color="foreground"
          size="sm"
          aria-label="Volume"
          value={volume}
          onChange={(value) => {
            setVolume(Array.isArray(value) ? value[0] : value);
            handleVolume();
          }}
          showOutline
          className={width >= 850 ? "w-1/2" : "w-full"}
        />
      </div>
    </main>
  );
}
