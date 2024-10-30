import { createContext, useContext, useState, ReactNode } from "react";

interface AudioContextType {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  songs: any[];
  setSongs: (songs: any[]) => void;
  currentAlbum: string;
  setCurrentAlbum: (currentAlbum: string) => void;
  queue: number;
  currentArtist: string;
  setCurrentArtist: (currentArtist: string) => void;
  setQueue: (queue: number) => void;
  artist: string;
  setArtist: (artist: string) => void;
  album: string;
  setAlbum: (album: string) => void;
  albumId: string;
  setAlbumId: (albumId: string) => void;
  isLooping: boolean;
  setIsLooping: (isLooping: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState<any[]>([]);
  const [artist, setArtist] = useState("");
  const [currentArtist, setCurrentArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [currentAlbum, setCurrentAlbum] = useState("");
  const [queue, setQueue] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  return (
    <AudioContext.Provider
      value={{
        albumId,
        setAlbumId,
        currentArtist,
        setCurrentArtist,
        isLooping,
        setIsLooping,
        currentAlbum,
        setCurrentAlbum,
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
