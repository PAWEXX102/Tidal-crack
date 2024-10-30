"use client";

import { db } from "./services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import AlbumCover from "./components/albumCover";

export default function Home() {
  const [albums, setAlbums] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const albumsCollection = collection(db, "albums");
      const albumsSnapshot = await getDocs(albumsCollection);
      const albumsList = albumsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlbums(albumsList);
      console.log(albumsList);
    };
    fetchData();
  }, []);

  return (
    <main className=" text-white items-start gap-x-[26px] overflow-auto w-full h-full flex flex-wrap px-8 pt-8 flex-shrink-1 content-start">
      {albums.map((album) => (
        <AlbumCover
          key={album.id}
          title={album.Title}
          artist={album.Artist}
          id={album.id}
          songs={album.Songs}
        />
      ))}
    </main>
  );
}
