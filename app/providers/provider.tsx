"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AlbumViewProvider } from "./albumViewProvider";
import { AudioProvider } from "./audioProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <AudioProvider>
          <AlbumViewProvider>{children}</AlbumViewProvider>
        </AudioProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
