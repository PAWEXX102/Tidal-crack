import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";
import Providers from "./providers/provider";
import PlayBar from "./components/playbar";
import SearchBar from "./components/searchbar";
import AlbumView from "./components/albumView";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Melodrive",
  description: "Music streaming platform",
  icons: [
    {
      url: "/logo.png",
      rel: "icon",
      type: "image/x-icon",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} relative`}>
        <SpeedInsights />
        <Providers>
          <div className="flex h-svh pb-24">
            <div>
              <Sidebar />
            </div>
            <div className=" relative w-full">
              {children}
            </div>
          </div>
          <AlbumView />
          <PlayBar />
        </Providers>
      </body>
    </html>
  );
}
