import { createContext, useContext, useState, ReactNode } from "react";

interface AudioContextType {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  songs: any[];
  setSongs: (songs: any[]) => void;
  queue: number;
  setQueue: (queue: number) => void;
  artist: string;
  setArtist: (artist: string) => void;
  album: string;
  setAlbum: (album: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState<any[]>([]);
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [queue, setQueue] = useState(0);
  return (
    <AudioContext.Provider
      value={{
        queue,
        setQueue,
        isPlaying,
        setIsPlaying,
        songs,
        setSongs,
        artist,
        setArtist,
        album,
        setAlbum,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
