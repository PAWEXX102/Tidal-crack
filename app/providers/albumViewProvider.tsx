import { createContext, useContext, useState, ReactNode } from "react";

interface AlbumViewContextType {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  url: string;
  setUrl: (url: string) => void;
}

const AlbumViewContext = createContext<AlbumViewContextType | undefined>(
  undefined
);

export const AlbumViewProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  return (
    <AlbumViewContext.Provider value={{ isOpen, setOpen, url, setUrl }}>
      {children}
    </AlbumViewContext.Provider>
  );
};

export const useAlbumView = () => {
  const context = useContext(AlbumViewContext);
  if (!context) {
    throw new Error("useAlbumView must be used within an AlbumViewProvider");
  }
  return context;
};
