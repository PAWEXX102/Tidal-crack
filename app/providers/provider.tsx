"use client";

import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import AuthProvider from "./authProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
      <AuthProvider>{children}</AuthProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}